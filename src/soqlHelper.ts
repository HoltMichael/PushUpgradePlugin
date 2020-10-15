export class OrderByExpression {

    public static parse(input: string): OrderByExpression {
        if (input && input.trim()) {
            const tokens = input.split(' ');
            let fieldName: string;
            let descending: boolean = false;

            if (tokens.length >= 1 && tokens.length <= 2) {
                fieldName = tokens[0];
                if (tokens.length === 2) {
                    const direction = tokens[1].toLowerCase();
                    if (direction === 'desc') descending = true;
                }
            }

            return new OrderByExpression(fieldName, descending);
        }

        return null;
    }

    private _fieldName: string;
    private _descending: boolean;

    get fieldName(): string {
        return this._fieldName;
    }

    get descending(): boolean {
        return this._descending;
    }

    constructor(fieldName: string, descending?: boolean) {
        this._fieldName = fieldName;
        this._descending = descending || false;
    }

    public toString() {
        let output: string = this._fieldName;
        if (this._descending) output += ' DESC';

        return output;
    }
}

export interface OrderByArguments {
    expressions: OrderByExpression[];
    nullsLast: boolean;
}

export class SoqlHelper {
    public static formatFilterExpression(leftHand: string, operator: string, rightHand: string) {
        const output: string = leftHand.trim() + ' ' + operator.trim() + ' ' + rightHand.trim();
        return output;
    }

    public static formatEqualsFilterExpression(leftHand: string, rightHand: string) {
        const output: string = this.formatFilterExpression(leftHand, '=', '\'' + rightHand + '\'');
        return output;
    }

    public static formatInFilterExpression(leftHand: string, values: string[]) {
        const rightHand: string = '(\'' + values.join('\', \'') + '\')';
        const output: string = this.formatFilterExpression(leftHand, 'IN', rightHand);
        return output;
    }

    public static formatWhereClause(filterExpressions: string[], logicalOperator: string) {
        const output: string = 'WHERE ' + filterExpressions.join(' ' + logicalOperator + ' ');
        return output;
    }

    public static formatOrderByClause(orderByExpressions: OrderByExpression[], nullsLast?: boolean) {
        const expressions: string[] = [];
        orderByExpressions.forEach(expression => {
            expressions.push(expression.toString());
        });

        let output: string = '';
        if (expressions.length > 0) output += 'ORDER BY ' + expressions.join(', ');
        if (nullsLast) output += ' NULLS LAST';

        return output;
    }

    public static formatSoql(objectName: string, fieldNames: string[], filterExpressions?: string[], orderBy?: OrderByArguments) {
        let output = 'SELECT ' + fieldNames.join(', ') + ' FROM ' + objectName;

        // Conditionally add WHERE clause
        if (filterExpressions && filterExpressions.length > 0) output += ' ' + this.formatWhereClause(filterExpressions, 'AND');

        // Conditionally add ORDER BY clause
        if (orderBy && orderBy.expressions && orderBy.expressions.length > 0) output += ' ' + this.formatOrderByClause(orderBy.expressions, orderBy.nullsLast);

        return output;
    }
}