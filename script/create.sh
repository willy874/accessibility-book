echo Initialized
yarn install
git restore yarn.lock

if [ ! -f ".vscode/settings.json" ]; then
mkdir .vscode
cat > .vscode/settings.json << EOF
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "editor.formatOnSave": false,
  "editor.formatOnPaste": false,
  "eslint.validate": [
    "javascript",
    "vue"
  ]
}
EOF
echo "Create VSCode Settings."
fi
