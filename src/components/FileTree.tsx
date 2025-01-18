import React from 'react';
import { Folder, FileIcon } from 'lucide-react';

interface FileTreeProps {
  content: string;
}

const FileTree: React.FC<FileTreeProps> = ({ content }) => {
  const lines = content.split('\n');
  
  const processLine = (line: string) => {
    const indentLevel = line.search(/\S/);
    const text = line.trim();
    const isFolder = text.endsWith('/') || !text.includes('.');
    
    return (
      <div
        key={line}
        className="flex items-center group hover:bg-gray-200 dark:hover:bg-gray-700 rounded py-0.5 transition-colors"
        style={{ paddingLeft: `${indentLevel * 16}px` }}
      >
        {indentLevel > 0 && (
          <div className="relative h-full">
            <span className="absolute left-0 border-l border-dotted border-gray-400 dark:border-gray-600 h-full -ml-[16px]" />
            <span className="absolute border-t border-dotted border-gray-400 dark:border-gray-600 w-4 top-[50%] -left-4" />
          </div>
        )}
        <div className="flex items-center gap-2">
          {isFolder ? (
            <Folder size={14} className="text-blue-500 shrink-0" />
          ) : (
            <FileIcon size={14} className="text-gray-500 shrink-0" />
          )}
          <span className="whitespace-pre text-gray-800 dark:text-gray-200">
            {text.replace('/', '')}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="font-mono text-sm overflow-x-auto">
      {lines.filter(line => line.trim()).map((line) => processLine(line))}
    </div>
  );
};

export default FileTree;
