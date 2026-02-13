# fixie.js
*Like [FitText](https://github.com/davatron5000/FitText.js) or [BigText](https://github.com/zachleat/BigText), but for fixed-width fonts.*

## Usage

### Vanilla JavaScript
Include the script at the bottom of your page, provide a font-size in em for your pre elements and decorate them with a class name of 'fixie' followed by an underscore & the number of columns, such as:

    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" type="text/css" href="fixie.css" />
    </head>
    <body>
        
        <pre class="fixie_80">I'll scale nicely to a happy 80 columns!</pre>
        
        <script type="text/javascript" src="fixie.js"></script>
    </body>
    </html>

### React Component
Use the React component by importing `Fixie` and passing the number of columns as a prop:

```jsx
import React from 'react';
import Fixie from './Fixie.jsx';
import './fixie.css';

function App() {
  return (
    <div>
      <Fixie columns={80}>
        I'll scale nicely to a happy 80 columns!
      </Fixie>
    </div>
  );
}

export default App;
```

#### Props
- `columns` (number, required): Number of columns to fit the content to
- `children` (ReactNode, required): The content to display
- `className` (string, optional): Additional CSS classes
- `style` (object, optional): Additional inline styles
- Any other props are passed through to the underlying `<pre>` element

## Contributions

All contributions are welcome.

## License

fixie.js is free (as in love), and is provided under The MIT License (MIT)
