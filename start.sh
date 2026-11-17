#!/bin/sh
# Start a local web server and open Pop-up English in the browser (ES modules need http://, not file://)
cd "$(dirname "$0")"
PORT=${PORT:-8796}
python3 -m http.server "$PORT" >/dev/null 2>&1 &
sleep 1
open "http://localhost:$PORT/" 2>/dev/null || echo "open http://localhost:$PORT/"
echo "serving on http://localhost:$PORT  (Ctrl+C to stop)"; wait
