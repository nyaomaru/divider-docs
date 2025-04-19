import { Highlight, themes } from 'prism-react-renderer';
import type { CodeBlockProps } from '@/types/ui/components/code-block';

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <Highlight code={code} language={language} theme={themes.oceanicNext}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} p-4 rounded-lg`} style={style}>
          {tokens.map((line, index) => (
            <div key={`line-${index}`} {...getLineProps({ line })}>
              {line.map((token, tokenIndex) => (
                <span
                  key={`token-${index}-${tokenIndex}`}
                  {...getTokenProps({ token })}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
