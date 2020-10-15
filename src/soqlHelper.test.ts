import { OrderByExpression, SoqlHelper } from '../src/soqlHelper';

let assert = require('assert');

// OrderByExpression tests

describe('OrderByExpression', function () {
    describe('#constructor()', function () {
        it('should return a valid object for \'Id\'.', function () {
            const obj = new OrderByExpression('Id', false);
            assert.equal(obj.fieldName, 'Id');
            assert.equal(obj.descending, false);
        });
    });
});

describe('OrderByExpression', function () {
    describe('#parse()', function () {
        it('should return a valid object for \'Id DESC\'.', function () {
            const actual = OrderByExpression.parse('Id DESC');
            assert.equal(actual.fieldName, 'Id');
            assert.equal(actual.descending, true);
        });
    });
});

describe('OrderByExpression', function () {
    describe('#parse()', function () {
        it('should return a valid object for \'Id ASC\'.', function () {
            const actual = OrderByExpression.parse('Id ASC');
            assert.equal(actual.fieldName, 'Id');
            assert.equal(actual.descending, false);
        });
    });
});

describe('OrderByExpression', function () {
    describe('#parse()', function () {
        it('should return a null with null input', function () {
            const actual = OrderByExpression.parse(null);
            assert.equal(actual, null);
        });
    });
});

// SoqlHelper tests
describe('SoqlHelper', function () {
    describe('#formatEqualsFilterExpression()', function () {
        it('returns appropriately formatted string based on inputs.', function () {
            const actual = SoqlHelper.formatEqualsFilterExpression('FieldName', 'Value');
            const expected = 'FieldName = \'Value\'';
            assert.equal(actual, expected);
        });
    });
});

describe('SoqlHelper', function () {
    describe('#formatInFilterExpression()', function () {
        it('returns appropriately formatted string based on inputs.', function () {
            const actual = SoqlHelper.formatInFilterExpression('FieldName', ['Value1', 'Value2', 'Value3']);
            const expected = 'FieldName IN (\'Value1\', \'Value2\', \'Value3\')';
            assert.equal(actual, expected);
        });
    });
});

describe('SoqlHelper', function () {
    describe('#formatWhereClause()', function () {
        it('returns appropriately formatted string based on inputs.', function () {
            const filterExpressions = ['Id = \'Value1\'', 'Name = \'Value2\'', 'Custom__c = \'Value3\''];
            const logicalOperator = 'AND'
            const actual = SoqlHelper.formatWhereClause(filterExpressions, logicalOperator);
            const expected = 'WHERE Id = \'Value1\' AND Name = \'Value2\' AND Custom__c = \'Value3\'';
            assert.equal(actual, expected);
        });
    });
});

describe('SoqlHelper', function () {
    describe('#formatOrderByClause()', function () {
        it('returns appropriately formatted string based on inputs.', function () {
            const fieldNames = ['Id', 'Name', 'Custom__c'];
            const orderByExpressions = fieldNames.map(item => (new OrderByExpression(item)));
            const nullsLast = false;
            const actual = SoqlHelper.formatOrderByClause(orderByExpressions, nullsLast);
            const expected = 'ORDER BY Id, Name, Custom__c';
            assert.equal(actual, expected);
        });
    });
});

describe('SoqlHelper', function () {
    describe('#formatOrderByClause()', function () {
        it('returns appropriately formatted string based on inputs.', function () {
            const fieldNames = ['Id', 'Name', 'Custom__c'];
            const orderByExpressions = fieldNames.map(item => (new OrderByExpression(item)));
            const nullsLast = true;
            const actual = SoqlHelper.formatOrderByClause(orderByExpressions, nullsLast);
            const expected = 'ORDER BY Id, Name, Custom__c NULLS LAST';
            assert.equal(actual, expected);
        });
    });
});

describe('SoqlHelper', function () {
    describe('#formatSoql()', function () {
        it('returns appropriately formatted string based on inputs.', function () {
            const objectName = 'Account';
            const fieldNames = ['Id', 'Name', 'Custom__c'];
            const filterExpressions = ['Id = \'Value1\'', 'Name = \'Value2\'', 'Custom__c = \'Value3\''];
            const orderByExpressions = fieldNames.map(item => (new OrderByExpression(item)));
            const nullsLast = true;
            const actual = SoqlHelper.formatSoql(objectName, fieldNames, filterExpressions, {expressions: orderByExpressions, nullsLast: nullsLast});
            const expected = 'SELECT Id, Name, Custom__c FROM Account WHERE Id = \'Value1\' AND Name = \'Value2\' AND Custom__c = \'Value3\' ORDER BY Id, Name, Custom__c NULLS LAST';
            assert.equal(actual, expected);
        });
    });
});