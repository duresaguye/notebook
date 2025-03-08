"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./react-quill-styles.css";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
};

export const RichTextEditor = ({
  value,
  onChange,
  label,
  className,
}: RichTextEditorProps) => (
  <div className={className}>
    {label && <label className="mb-2 block text-sm text-gray-800">{label}</label>}
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <ReactQuill 
        theme="snow"
        value={value} 
        onChange={onChange}
        className="[&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-t-0"
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }}
      />
    </div>
  </div>
);