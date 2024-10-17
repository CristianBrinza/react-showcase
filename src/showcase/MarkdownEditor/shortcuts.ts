import { EditorView, KeyBinding } from '@codemirror/view';

// Command to toggle formatting
function toggleFormatting(view: EditorView, syntax: string): boolean {
    const { state } = view;
    const { from, to, empty } = state.selection.main;
    const selectedText = state.sliceDoc(from, to);

    let newText;
    let offset = 0;

    if (empty) {
        // If selection is empty, insert syntax and place cursor between
        newText = `${syntax}${syntax}`;
        offset = syntax.length;
    } else {
        newText = `${syntax}${selectedText}${syntax}`;
        offset = syntax.length;
    }

    view.dispatch({
        changes: { from, to, insert: newText },
        selection: { anchor: from + offset, head: from + newText.length - offset },
    });

    return true;
}

// Command functions
const toggleBold = (view: EditorView): boolean => toggleFormatting(view, '**');
const toggleItalic = (view: EditorView): boolean => toggleFormatting(view, '_');
const toggleCode = (view: EditorView): boolean => toggleFormatting(view, '`');

// Custom keymap with commands
export function customKeymap(): KeyBinding[] {
    return [
        {
            key: 'Mod-b',
            run: toggleBold, // Handles bold formatting
        },
        {
            key: 'Mod-i',
            run: toggleItalic, // Handles italic formatting
        },
        {
            key: 'Mod-`',
            run: toggleCode, // Handles code formatting
        },
        // Add more shortcuts as needed
    ];
}
