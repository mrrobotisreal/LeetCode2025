/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

class Queue {
public:
    explicit Queue(std::size_t capacity)
        : buf_(std::max<std::size_t>(capacity, 4)),
          head_(0), tail_(0), size_(0) {}

    int Len() const { return static_cast<int>(size_); }

    void Push(TreeNode* tn) {
        if (size_ == buf_.size()) grow();

        buf_[tail_] = tn;
        tail_ = (tail_ + 1) % buf_.size();
        ++size_;
    }

    TreeNode* Pop() {
        if (size_ == 0) return nullptr;

        TreeNode* tn = buf_[head_];
        buf_[head_] = nullptr;
        head_ = (head_ + 1) % buf_.size();
        --size_;
        return tn;
    }

private:
    void grow() {
        std::size_t newLen = buf_.size() * 2;
        std::vector<TreeNode*> newBuf(newLen, nullptr);

        // Copy elements in logical order
        for (std::size_t i = 0; i < size_; ++i) {
            newBuf[i] = buf_[(head_ + i) % buf_.size()];
        }
        buf_.swap(newBuf);
        head_ = 0;
        tail_ = size_;
    }

    std::vector<TreeNode*> buf_;
    std::size_t head_, tail_;
    std::size_t size_;
};

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};

        std::vector<std::vector<int>> results;
        Queue q(8);
        q.Push(root);

        while (q.Len() > 0) {
            int levelSize = q.Len();
            std::vector<int> currentLevel;
            currentLevel.reserve(levelSize);

            for (int i = 0; i < levelSize; ++i) {
                TreeNode* node = q.Pop();
                currentLevel.push_back(node->val);

                if (node->left)  q.Push(node->left);
                if (node->right) q.Push(node->right);
            }
            results.emplace_back(std::move(currentLevel));
        }
        return results;
    }
};