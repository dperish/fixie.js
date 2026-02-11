import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Fixie React Component
 * Automatically scales fixed-width font content to fit a specified number of columns.
 * 
 * @param {Object} props
 * @param {number} props.columns - Number of columns to fit (e.g., 80 for 80 columns)
 * @param {React.ReactNode} props.children - Content to display
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.style] - Additional inline styles
 */
const Fixie = ({ columns, children, className = '', style = {}, ...otherProps }) => {
  const preRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  const fixieMeasure = useCallback(() => {
    if (!preRef.current) return;

    const pre = preRef.current;
    const ruler = document.createElement('code');
    ruler.id = 'fixieRuler';
    
    document.body.insertBefore(ruler, pre);
    
    ruler.innerText = new Array(columns + 1).join('F');
    ruler.style.fontSize = pre.style.fontSize || '1em';
    pre.setAttribute('data-fixieWidth', ruler.offsetWidth);
    
    ruler.parentNode.removeChild(ruler);
  }, [columns]);

  const fixieResize = useCallback(() => {
    if (!preRef.current) return;

    const pre = preRef.current;
    const offset = pre.offsetWidth;
    const fixieWidth = parseFloat(pre.getAttribute('data-fixieWidth')) * 1.01;
    
    if (fixieWidth) {
      pre.style.fontSize = (offset / fixieWidth) + 'em';
    }
  }, []);

  useEffect(() => {
    // Initialize
    fixieMeasure();
    fixieResize();

    // Set up resize handler with debouncing
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        fixieResize();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [fixieMeasure, fixieResize]);

  const combinedClassName = `fixie_${columns} ${className}`.trim();
  const combinedStyle = {
    fontSize: '1em',
    ...style
  };

  return (
    <pre
      ref={preRef}
      className={combinedClassName}
      style={combinedStyle}
      {...otherProps}
    >
      {children}
    </pre>
  );
};

export default Fixie;
