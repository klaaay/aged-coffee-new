# cc-connect Integration

This project is connected via cc-connect.

## Scheduled tasks (cron)

When the user asks you to run something on a schedule, use the Bash/shell tool to run:

```bash
cc-connect cron add --cron "<cron>" --prompt "<prompt>" --desc "<description>"
```

`CC_PROJECT` and `CC_SESSION_KEY` are already set, so do not pass `--project` or `--session-key`.

## Send message to current chat

To proactively send a message back to the user's chat session:

```bash
cc-connect send --stdin <<'CCEOF'
your message here
CCEOF
```

For short one-line messages:

```bash
cc-connect send -m "short message"
```
