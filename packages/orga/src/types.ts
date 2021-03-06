import { Literal as UnistLiteral, Node, Parent as UnistParent } from 'unist'

// ---- Basic Types ----
export interface Parent extends UnistParent {
  parent?: Parent;
}

export interface Timestamp {
  date: Date;
  end?: Date;
}

// ---- Syntax Tree Nodes ----
export interface Document extends Parent {
  type: 'document';
  properties: { [key: string]: string; };
  children: TopLevelContent[];
}

export interface Section extends Parent {
  type: 'section';
  level: number;
  properties: { [key: string]: string; };
  children: Content[];
}

type TopLevelContent =
  | Content | Keyword | Footnote

type Content =
  | Section
  | Paragraph
  | Block
  | Drawer
  | Planning
  | List
  | Table
  | HorizontalRule
  | Headline
  | HTML

export interface Footnote extends Parent {
  type: 'footnote';
  label: string;
}

export interface Block extends Literal {
  type: 'block';
  name: string;
  params: string[];
  value: string;
}

export interface Drawer extends Literal {
  type: 'drawer';
  name: string;
  value: string;
}

export interface Planning extends Node {
  type: 'planning';
  keyword: string;
  timestamp: Timestamp;
}

export interface List extends Parent {
  type: 'list';
  indent: number;
  ordered: boolean;
  children: ListItem[];
}

type TableContent = TableRow | TableRule

export interface Table extends Parent {
  type: 'table';
  children: TableContent[];
}

export interface TableRow extends Parent {
  type: 'table.row';
  children: TableCell[];
}

export interface TableCell extends Parent {
  type: 'table.cell';
  children: PhrasingContent[];
}

export interface ListItem extends Parent {
  type: 'list.item';
  indent: number;
  tag?: string;
}

export interface Headline extends Parent {
  type: 'headline';
  level: number;
  keyword?: string;
  actionable: boolean;
  priority?: string;
  content: string;
  tags?: string[];
}


export interface Paragraph extends Parent {
  type: 'paragraph';
  children: PhrasingContent[];
}

interface Literal extends UnistLiteral {
  value: string;
}

export interface HTML extends Literal {
  type: 'html';
}

// ---- Tokens ----
export type Token =
  | Keyword
  | Todo
  | Newline
  | HorizontalRule
  | Stars
  | Priority
  | Tags
  | PlanningKeyword
  | PlanningTimestamp
  | ListItemTag
  | ListItemCheckbox
  | ListItemBullet
  | TableRule
  | TableColumnSeparator
  | PhrasingContent
  | FootnoteLabel
  | BlockBegin
  | BlockEnd
  | DrawerBegin
  | DrawerEnd
  | Comment

export type PhrasingContent =
  | StyledText | Link | FootnoteReference

export interface HorizontalRule extends Node {
  type: 'hr'
}

interface Newline extends Node {
  type: 'newline'
}

export interface StyledText extends Literal {
  type:
    | 'text.plain'
    | 'text.bold'
    | 'text.verbatim'
    | 'text.italic'
    | 'text.strikeThrough'
    | 'text.underline'
    | 'text.code'
}

export interface Link extends Literal {
  type: 'link';
  protocol: string;
  description: string;
  value: string;
  search?: string | number;
}

export interface FootnoteReference extends Node {
  type: 'footnote.reference';
  label: string;
}

// headline tokens
export interface Stars extends Node {
  type: 'stars';
  level: number;
}

export interface Todo extends Node {
  type: 'todo';
  keyword: string;
  actionable: boolean;
}

export interface Priority extends Literal {
  type: 'priority';
  value: string;
}

export interface Tags extends Node {
  type: 'tags';
  tags: string[];
}

// block tokens
export interface BlockBegin extends Node {
  type: 'block.begin';
  name: string;
  params: string[];
}

export interface BlockEnd extends Node {
  type: 'block.end';
  name: string;
}

// drawer tokens
export interface DrawerBegin extends Node {
  type: 'drawer.begin';
  name: string;
}

interface DrawerEnd extends Node {
  type: 'drawer.end';
}

interface Comment extends Literal {
  type: 'comment';
}

export interface Keyword extends Node {
  type: 'keyword';
  key: string;
  value: string;
}

export interface FootnoteLabel extends Node {
  type: 'footnote.label';
  label: string;
}

export interface PlanningKeyword extends Literal {
  type: 'planning.keyword';
  value: string;
}

export interface PlanningTimestamp extends UnistLiteral {
  type: 'planning.timestamp';
  value: Timestamp;
}

export interface ListItemTag extends Literal {
  type: 'list.item.tag';
}

export interface ListItemCheckbox extends Node {
  type: 'list.item.checkbox';
  checked: boolean;
}

export interface ListItemBullet extends Node {
  type: 'list.item.bullet';
  ordered: boolean;
  indent: number;
}

export interface TableRule extends Node {
  type: 'table.hr';
}

export interface TableColumnSeparator extends Node {
  type: 'table.columnSeparator';
}
