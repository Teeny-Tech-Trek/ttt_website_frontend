import React, { ReactNode } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

export interface BlogBlock {
  id: string;
  type: string;
  text?: string;
  level?: number;
  items?: string[];
  header?: string[];
  body?: string[][];
  url?: string;
  alt?: string;
  caption?: string;
  question?: string;
  answer?: string;
  lang?: string;
  style?: 'info' | 'warning' | 'success' | 'error' | string;
  height?: number; // for spacer blocks
  children?: BlogBlock[]; // for custom sections
}

// Inline formatting parser: **bold**, *italic*, `code` (exact parity to legacy engine)
export function renderInline(text: string | undefined, keyBase: string): ReactNode[] {
  if (!text) return [];
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) {
      nodes.push(
        <strong key={`${keyBase}-b-${k}`} className="font-semibold text-gray-900">
          {tok.slice(2, -2)}
        </strong>
      );
    } else if (tok.startsWith('`')) {
      nodes.push(
        <code
          key={`${keyBase}-c-${k}`}
          className="px-1.5 py-0.5 rounded bg-gray-100 text-blue-700 text-[0.9em] font-mono"
        >
          {tok.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(
        <em key={`${keyBase}-i-${k}`} className="italic">
          {tok.slice(1, -1)}
        </em>
      );
    }
    last = regex.lastIndex;
    k++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// A paragraph that is one single bold sentence == the "answer" lead.
function isAnswerLead(text: string): boolean {
  const s = text.trim();
  if (!(s.startsWith('**') && s.endsWith('**') && s.length > 4)) return false;
  return s.slice(2, -2).indexOf('**') === -1;
}

export const renderBlock = (b: BlogBlock, key: string): ReactNode => {
  switch (b.type) {
    case 'divider':
    case 'hr':
      return <hr key={key} className="border-t border-gray-200 my-8" />;

    case 'heading': {
      const level = b.level || 2;
      const classes = level === 1 
        ? "text-3xl font-bold text-gray-900 mt-10 mb-4" 
        : "text-2xl md:text-3xl font-bold text-gray-900 leading-tight";
      
      if (level === 1) {
        return (
          <h1 key={key} className={classes}>
            {renderInline(b.text, key)}
          </h1>
        );
      }

      // H2 question check
      const isQ = (b.text || '').trim().endsWith('?');
      return (
        <div key={key} className="flex items-start gap-3 mt-12 mb-5">
          {isQ ? (
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm mt-0.5">
              <HelpCircle className="w-5 h-5" />
            </div>
          ) : (
            <div className="flex-shrink-0 w-1.5 self-stretch min-h-[2rem] rounded-full bg-gradient-to-b from-blue-600 to-indigo-600" />
          )}
          <h2 className={classes}>
            {renderInline(b.text, key)}
          </h2>
        </div>
      );
    }

    case 'subheading':
      return (
        <h3 key={key} className="text-xl font-bold text-gray-900 mt-8 mb-3">
          {renderInline(b.text, key)}
        </h3>
      );

    case 'paragraph':
    case 'p': {
      const textVal = b.text || '';
      if (isAnswerLead(textVal)) {
        const inner = textVal.trim().slice(2, -2);
        return (
          <div
            key={key}
            className="flex gap-3 rounded-xl bg-blue-50/70 border border-blue-100 border-l-4 border-l-blue-500 p-4 my-6"
          >
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-gray-800 font-medium leading-relaxed">
              {renderInline(inner, key)}
            </p>
          </div>
        );
      }
      return (
        <p key={key} className="text-gray-700 leading-relaxed text-[1.05rem] my-4">
          {renderInline(textVal, key)}
        </p>
      );
    }

    case 'highlight':
      return (
        <div
          key={key}
          className="flex gap-3 rounded-xl bg-blue-50/70 border border-blue-100 border-l-4 border-l-blue-500 p-4 my-6"
        >
          <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-800 font-medium leading-relaxed">
            {renderInline(b.text, key)}
          </p>
        </div>
      );

    case 'quote':
      return (
        <div
          key={key}
          className="flex gap-3 rounded-xl bg-indigo-50 border-l-4 border-indigo-500 p-4 my-6"
        >
          <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-800 leading-relaxed">{renderInline(b.text, key)}</p>
        </div>
      );

    case 'callout': {
      const statusStyle = b.style || 'info';
      const bgMap: Record<string, string> = {
        info: 'bg-blue-50 border-l-blue-500 text-blue-800',
        warning: 'bg-amber-50 border-l-amber-500 text-amber-800',
        success: 'bg-green-50 border-l-green-500 text-green-800',
        error: 'bg-red-50 border-l-red-500 text-red-800',
      };
      const bgClass = bgMap[statusStyle] || bgMap.info;
      return (
        <div key={key} className={`p-4 rounded-r-xl border-l-4 my-6 leading-relaxed ${bgClass}`}>
          {renderInline(b.text, key)}
        </div>
      );
    }

    case 'bulletList':
    case 'ul':
      return (
        <ul key={key} className="space-y-2.5 my-5">
          {(b.items || []).map((it, idx) => (
            <li key={idx} className="flex gap-3 text-gray-700 leading-relaxed">
              <span className="mt-2.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>{renderInline(it, `${key}-${idx}`)}</span>
            </li>
          ))}
        </ul>
      );

    case 'orderedList':
    case 'ol':
      return (
        <ol key={key} className="space-y-3 my-5">
          {(b.items || []).map((it, idx) => (
            <li key={idx} className="flex gap-3 text-gray-700 leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <span>{renderInline(it, `${key}-${idx}`)}</span>
            </li>
          ))}
        </ol>
      );

    case 'table':
      return (
        <div key={key} className="overflow-x-auto rounded-xl border border-gray-200 my-6 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                {(b.header || []).map((h, idx) => (
                  <th key={idx} className="px-4 py-3 font-semibold">
                    {renderInline(h, `${key}-h-${idx}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(b.body || []).map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 ? 'bg-gray-50' : 'bg-white'}>
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="px-4 py-3 text-gray-700 align-top border-t border-gray-100"
                    >
                      {renderInline(cell, `${key}-${rIdx}-${cIdx}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'faq':
      return (
        <div
          key={key}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden my-8"
        >
          <div className="flex items-start gap-3 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[0.7rem] font-bold uppercase tracking-wider text-blue-600">
                Question
              </span>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
                {b.question}
              </h3>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {b.answer ? (
              <p className="text-gray-700 leading-relaxed text-[1.05rem]">
                {renderInline(b.answer, `${key}-ans`)}
              </p>
            ) : null}
          </div>
        </div>
      );

    case 'image':
      return (
        <div key={key} className="my-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white p-2">
          <img src={b.url} alt={b.alt || 'Blog inline image'} className="w-full object-cover rounded-xl" />
          {b.caption && (
            <p className="text-center text-xs text-gray-500 mt-2.5 italic px-2">{b.caption}</p>
          )}
        </div>
      );

    case 'spacer':
      return <div key={key} style={{ height: b.height || 20 }} className="w-full" />;

    case 'code':
      return (
        <pre key={key} className="p-4 rounded-xl bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto my-6 shadow-sm">
          <code className={`language-${b.lang || 'javascript'}`}>{b.text}</code>
        </pre>
      );

    case 'comparison':
      return (
        <div key={key} className="overflow-x-auto rounded-xl border border-gray-200 my-6 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-slate-700 to-slate-900 text-white">
                {(b.header || []).map((h, idx) => (
                  <th key={idx} className="px-4 py-3 font-semibold">{renderInline(h, `${key}-comp-h-${idx}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(b.body || []).map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 ? 'bg-slate-50' : 'bg-white'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-gray-700 align-top border-t border-gray-100">
                      {renderInline(cell, `${key}-${rIdx}-${cIdx}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'custom_section':
    case 'custom':
      // Render child blocks recursively inside a styling wrapper (Requirement 13)
      return (
        <div key={key} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 my-6 space-y-4">
          {(b.children || []).map((child, idx) => renderBlock(child, `${key}-child-${idx}`))}
        </div>
      );

    default:
      return null;
  }
};

export interface BlogRendererProps {
  blocks: BlogBlock[];
}

export const BlogRenderer: React.FC<BlogRendererProps> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-5">
      {blocks.map((block, idx) => renderBlock(block, `renderer-block-${idx}`))}
    </div>
  );
};

export default BlogRenderer;
