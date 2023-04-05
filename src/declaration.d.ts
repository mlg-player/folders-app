// declaration.d.ts
declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

type LowerCaseStringType = 'a' | 'b' | 'c' | 'd'
type UpperCaseStringType = 'A' | 'B' | 'C' | 'D'
/** ITS WORKING!!!!!!! */
type StringType = `${UpperCaseStringType}-${LowerCaseStringType}`
