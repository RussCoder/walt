// @flow
import Syntax from "../../Syntax";
import { typeCast } from "../metadata";
import type { NodeType } from "../../flow/types";

export const typeWeight = (typeString: ?string) => {
  switch (typeString) {
    case "i32":
      return 0;
    case "i64":
      return 1;
    case "f32":
      return 2;
    case "f64":
      return 3;
    default:
      return -1;
  }
};

export const balanceTypesInMathExpression = (
  expression: NodeType
): NodeType => {
  // find the result type in the expression
  let type = null;
  expression.params.forEach(({ type: childType }) => {
    // The way we do that is by scanning the top-level nodes in our expression
    if (typeWeight(type) < typeWeight(childType)) {
      type = childType;
    }
  });

  // iterate again, this time, patching any mis-typed nodes
  const params = expression.params.map(paramNode => {
    if (paramNode.type != null && paramNode.type !== type && type != null) {
      // last check is for flow
      return {
        ...paramNode,
        type,
        value: paramNode.value,
        Type: Syntax.TypeCast,
        meta: [...paramNode.meta, typeCast({ to: type, from: paramNode.type })],
        params: [paramNode],
      };
    }

    return paramNode;
  });

  return {
    ...expression,
    params,
    type,
  };
};
