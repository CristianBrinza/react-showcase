import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState, Extension } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { customKeymap } from './shortcuts';
import styles from './Editor.module.css';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

const Editor = forwardRef<EditorView, EditorProps>(({ value, onChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    useImperativeHandle(ref, () => viewRef.current!, []);

    useEffect(() => {
        if (editorRef.current && !viewRef.current) {
            // Initialize the editor only once
            const startState = EditorState.create({
                doc: value,
                extensions: [
                    markdown(),
                    oneDark,
                    keymap.of([...defaultKeymap, indentWithTab, ...customKeymap()]),
                    EditorView.updateListener.of((update) => {
                        if (update.changes) {
                            const value = update.state.doc.toString();
                            onChange(value);
                        }
                    }),
                    EditorView.lineWrapping,
                ],
            });

            const view = new EditorView({
                state: startState,
                parent: editorRef.current,
            });

            viewRef.current = view;
        }
    }, [onChange]);

    // Update the editor's content when 'value' changes without re-initializing the editor
    useEffect(() => {
        if (viewRef.current) {
            const editorValue = viewRef.current.state.doc.toString();
            if (value !== editorValue) {
                viewRef.current.dispatch({
                    changes: {
                        from: 0,
                        to: editorValue.length,
                        insert: value,
                    },
                });
            }
        }
    }, [value]);

    return <div className={styles.editor} ref={editorRef}></div>;
});

export default Editor;
