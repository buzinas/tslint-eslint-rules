"use strict";
var helper_1 = require("./helper");
var rule = 'no-empty-character-class';
var scripts = {
    valid: [
        'var foo = /^abc[a-zA-Z]/;',
        'var regExp = new RegExp(\'^abc[]\');',
        'var foo = /^abc/;',
        'var foo = /[\\[]/;',
        'var foo = /[\\]]/;',
        'var foo = /[a-zA-Z\\[]/;',
        'var foo = /[[]/;',
        'var foo = /[\\[a-z[]]/;',
        'var foo = /[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\^\\$\\|]/g;',
        'var foo = /\\s*:\\s*/gim;'
    ],
    invalid: [
        'var foo = /^abc[]/;',
        'var foo = /foo[]bar/;',
        'if (foo.match(/^abc[]/)) {}',
        'if (/^abc[]/.test(foo)) {}',
        'var foo = /[]]/;',
        'var foo = /\\[[]/;',
        'var foo = /\\[\\[\\]a-z[]/;'
    ]
};
describe(rule, function test() {
    it('should pass when not using empty character classes in regular expressions', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using empty character classes in regular expressions', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9FbXB0eUNoYXJhY3RlckNsYXNzUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxtQ0FBb0M7QUFFcEMsSUFBTSxJQUFJLEdBQUcsMEJBQTBCLENBQUM7QUFDeEMsSUFBTSxPQUFPLEdBQUc7SUFDZCxLQUFLLEVBQUU7UUFDTCwyQkFBMkI7UUFDM0Isc0NBQXNDO1FBQ3RDLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLDBCQUEwQjtRQUMxQixrQkFBa0I7UUFDbEIseUJBQXlCO1FBQ3pCLGlFQUFpRTtRQUNqRSwyQkFBMkI7S0FDNUI7SUFDRCxPQUFPLEVBQUU7UUFDUCxxQkFBcUI7UUFDckIsdUJBQXVCO1FBQ3ZCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7UUFDNUIsa0JBQWtCO1FBQ2xCLG9CQUFvQjtRQUNwQiw2QkFBNkI7S0FDOUI7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLElBQUksRUFBRTtJQUNiLEVBQUUsQ0FBQywyRUFBMkUsRUFBRTtRQUM5RSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHVFQUF1RSxFQUFFO1FBQzFFLGlCQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3J1bGVzL25vRW1wdHlDaGFyYWN0ZXJDbGFzc1J1bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9Xb3JrL0RldmVsb3BtZW50L3dvcmtzcGFjZS90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
