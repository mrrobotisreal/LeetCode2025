import { useState, useCallback, useEffect, useRef } from 'react';

/* ---------- Types ---------- */
type Checked = boolean | 'indeterminate';

export interface CheckboxItem {
  id: number;
  name: string;
  checked?: Checked;          // default = false
  children?: CheckboxItem[];
}

/* ---------- Helper: normalise incoming data ---------- */
function initTree(nodes: CheckboxItem[]): CheckboxItem[] {
  return nodes.map(n => ({
    ...n,
    checked: n.checked ?? false,
    children: n.children ? initTree(n.children) : undefined,
  }));
}

/* ---------- Helper: set an entire subtree to true/false ---------- */
function setWholeSubtree(node: CheckboxItem, value: boolean): CheckboxItem {
  return {
    ...node,
    checked: value,
    children: node.children?.map(c => setWholeSubtree(c, value)),
  };
}

/* ---------- Helper: recompute a parent from its children ---------- */
function recomputeFromChildren(children: CheckboxItem[] | undefined): Checked {
  if (!children || children.length === 0) return false;
  const everyChecked = children.every(c => c.checked === true);
  const noneChecked  = children.every(c => c.checked === false);
  if (everyChecked) return true;
  if (noneChecked)  return false;
  return 'indeterminate';
}

/* ---------- Recursive update ---------- */
function toggleNode(
  node: CheckboxItem,
  targetId: number,
  nextVal: boolean,
): CheckboxItem {
  /* Downward: found the clicked node → paint entire subtree. */
  if (node.id === targetId) return setWholeSubtree(node, nextVal);

  /* Otherwise recurse into children (if any)… */
  if (!node.children) return node;

  const newChildren = node.children.map(c => toggleNode(c, targetId, nextVal));

  /* Upward: after children are updated, recompute this parent. */
  return {
    ...node,
    children: newChildren,
    checked: recomputeFromChildren(newChildren),
  };
}

/* ---------- UI ---------- */
interface Props {
  defaultCheckboxData: readonly CheckboxItem[];
}

export default function Checkboxes({ defaultCheckboxData }: Props) {
  const [tree, setTree] = useState(() => initTree([...defaultCheckboxData]));

  const handleToggle = useCallback(
    (id: number, current: Checked) => {
      const nextVal = current === true ? false : true; // treat indeterminate as false ⇒ true
      setTree(prev => prev.map(n => toggleNode(n, id, nextVal)));
    },
    [],
  );

  return (
    <div>
      {tree.map(node => (
        <CheckboxNode key={node.id} node={node} onToggle={handleToggle} />
      ))}
    </div>
  );
}

/* ---------- One row + its children ---------- */
function CheckboxNode({
  node,
  onToggle,
}: {
  node: CheckboxItem;
  onToggle: (id: number, current: Checked) => void;
}) {
  const { id, name, checked, children } = node;
  const ref = useRef<HTMLInputElement>(null);

  /* Sync the ‘dash’ after every render */
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = checked === 'indeterminate';
  }, [checked]);

  return (
    <div style={{ marginLeft: 20 }}>
      <label>
        <input
          type="checkbox"
          ref={ref}
          checked={checked === true}
          onChange={() => onToggle(id, checked)}
        />
        {name}
      </label>

      {children?.map(child => (
        <CheckboxNode
          key={child.id}
          node={child}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
