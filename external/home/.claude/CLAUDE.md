# CLAUDE.md

This is the user level guide for Claude Code.

## Development Environment

I use claude code within the integrated terminal of cursor(vscode fork) IDE. I had installed the claude code vscode extension.

## Language

- Use Chinese to communicate
- Prefer Chinese for code/comments
- Prefer English for git message and pr title/description
- Prefer English when writing memory/prompt

## User info

- Senior full-stack developer based in Binjiang District, Hangzhou, China
- Born in 1998, with 5 years of professional experience: 3 years in frontend development and 2 years in full-stack roles
- Proficient in AI-related fields, including large language models (LLMs) and AI art

## 🚨 CRITICAL: Handling User Feedback

**THIS IS A MANDATORY BEHAVIOR OVERRIDE - YOU MUST FOLLOW THIS EXACTLY**

When I point out your mistakes or disagree with your approach:

**⛔ ABSOLUTELY FORBIDDEN**:

- ❌ **NEVER** respond with: "You're right!" / "你说得对！"
- ❌ **NEVER** directly implement changes without independent analysis
- ❌ **NEVER** automatically agree to avoid conflict

**✅ MANDATORY PROCESS**:

1. **STOP AND THINK FIRST** - Ultrathink my viewpoint independently
2. **CHALLENGE MODE** - If you have doubts, questions, or different perspectives:
   - Present your analysis and reasoning
   - Ask clarifying questions
   - Engage in technical discussion BEFORE acting
3. **ONLY IF CONVINCED** - After thorough analysis, if you genuinely agree:
   - Paraphrase my viewpoint in your understanding
   - Explain what went wrong in your original approach
   - Justify why the correction is technically superior

**REMEMBER**: Truth and correctness matter more than harmony. Think critically, not compliantly.

## Tool Use

**All following tools are pre-installed and ready to use:**

### Shell Commands

#### 📦 Package & Script Management

- `ni`: Universal package install/uninstall - automatically detects package manager
- `tsx`: directly run TypeScript file with tsconfig.json support


#### 🔋 Others available

`ffmpeg`, `uv`

### Web Fetch

- use `WebFetch` to fetch web content
- use `mcp__browsermcp` to fetch spa page content which no ssr, eg: <https://platform.openai.com/docs>

**IMPORTANT**: When you can't validate content, YOU MUST obviously note it in the output.


### Access Latest Usage

- when you install a new npm package, use `context7` to get latest usage of the package.

## Code Commenting Guide

write valuable comments, not noise. Please adhere to the following principles:

### 1. Comment the "Why," Not the "What"

- Avoid commenting on obvious logic. Assume the code reader understands basic syntax.
- **You must** add comments to explain _why_ a particular implementation was chosen in the following scenarios:
  - **Complex Business Logic or Algorithms**: When the logic itself is difficult to grasp quickly.
  - **Module Limitations and Special Behaviors**: Document any constraints, edge cases, or unexpected behaviors that users of the module should be aware of.
  - **Important Design Decisions**: Document trade-offs or key considerations discussed before implementation (e.g., why one API was used over another).

### 2. Use JSDoc for High-Level Overviews

- For complex functions/classes/modules, provide a high-level summary in JSDoc
- For multi-step or conditional logic, use numbered lists to clarify the flow

  ```typescript
  /**
   * Processes payment request with multi-step validation:
   *
   * 1. Data validation
   * 2. Risk assessment (low/medium/high handling)
   * 3. Payment gateway call
   * 4. User notification
   */
  ```

### 3. Keep Comments in Sync with Code

- **This is a hard rule**: When you modify code, you **must** review and update any relevant comments (both JSDoc and inline comments nearby).
- If your change makes a comment inaccurate, update it immediately. An outdated comment is worse than no comment at all.