import { EditorFile } from '../file/file.model';

export const projectMock: EditorFile[] = [
  {
    name: 'test.js',
    type: 'text/javascript',
    content: 'class Test {\n  constructor() {\n    this.a = 1;\n  }\n\n  something(x, y) {\n    this.a = x;\n    console.log(y);\n  }\n}',
  },
  {
    name: 'main.js',
    type: 'text/javascript',
    content: 'const t = new Test();\nt.something(12, 3);\nconsole.log(t.a);\ndocument.write(t.a);',
  },
  {
    name: 'src',
    type: 'directory',
    children: [
      {
        name: 'some.js',
        type: 'text/javascript',
        content: 'console.log("something");',
      },
    ],
  },
];
