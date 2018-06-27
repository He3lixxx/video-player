import './global--style-module.js';
const documentContainer = document.createElement('template');
documentContainer.setAttribute('style', 'display: none;');

documentContainer.innerHTML = `<dom-module id="overlay--style-module">
  <template>
    <style type="text/css" include="global--style-module">
      /* ------
      * The styles defined here are heritated by many classes.
      * Thus be careful when changing rules here.
       ------ */

     .overlay {
       position: absolute;
       width: 100%;
       height: 100%;
       z-index: 6;
       background-color: rgba(0, 0, 0, 0.25);
       @apply --set-foreground-color;
     }
     .overlay .button {
       cursor: pointer;
       padding: 10px;
     }
     .overlay .button:hover {
       background-color: rgba(148, 148, 148, 0.5)
     }
    </style>
  </template>
</dom-module>`;

document.head.appendChild(documentContainer.content);
