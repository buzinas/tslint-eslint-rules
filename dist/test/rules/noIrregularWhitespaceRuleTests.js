"use strict";
var helper_1 = require("./helper");
var rule = 'no-irregular-whitespace';
var scripts = {
    valid: [
        '"\\u000B";',
        '"\\u000C";',
        '"\\u0085";',
        '"\\u00A0"',
        '"\\u180E";',
        '"\\ufeff";',
        '"\\u2000";',
        '"\\u2001";',
        '"\\u2002";',
        '"\\u2003";',
        '"\\u2004";',
        '"\\u2005";',
        '"\\u2006";',
        '"\\u2007";',
        '"\\u2008";',
        '"\\u2009";',
        '"\\u200A";',
        '"\\u200B";',
        '"\\u2028";',
        '"\\u2029";',
        '"\\u202F";',
        '"\\u205f";',
        '"\\u3000";',
        '"\u000B";',
        '"\u000C";',
        '"\u0085";',
        '"\u00A0"',
        '"\u180E";',
        '"\ufeff";',
        '"\u2000";',
        '"\u2001";',
        '"\u2002";',
        '"\u2003";',
        '"\u2004";',
        '"\u2005";',
        '"\u2006";',
        '"\u2007";',
        '"\u2008";',
        '"\u2009";',
        '"\u200A";',
        '"\u200B";',
        '"\\\u2028";',
        '"\\\u2029";',
        '"\u202F";',
        '"\u205f";',
        '"\u3000";'
    ],
    invalid: [
        'var foo \u000B = "thing";',
        'var foo \u000C = "thing";',
        'var foo \u00A0 = "thing";',
        'var foo \u180E = "thing";',
        'var foo \ufeff = "thing";',
        'var foo \u2000 = "thing";',
        'var foo \u2001 = "thing";',
        'var foo \u2002 = "thing";',
        'var foo \u2003 = "thing";',
        'var foo \u2004 = "thing";',
        'var foo \u2005 = "thing";',
        'var foo \u2006 = "thing";',
        'var foo \u2007 = "thing";',
        'var foo \u2008 = "thing";',
        'var foo \u2009 = "thing";',
        'var foo \u200A = "thing";',
        'var foo \u2028 = "thing";',
        'var foo \u2029 = "thing";',
        'var foo \u202F = "thing";',
        'var foo \u205f = "thing";',
        'var foo \u3000 = "thing";',
        'var a = "b",\u2028c = "d",\ne = "f"\u2028',
        'var foo \u3000 = "thing", other \u3000 = "thing";\nvar third \u3000 = "thing";'
    ]
};
describe(rule, function test() {
    it('should pass when not using irregular whitespaces', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using irregular whitespaces', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9JcnJlZ3VsYXJXaGl0ZXNwYWNlUnVsZVRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxtQ0FBb0M7QUFFcEMsSUFBTSxJQUFJLEdBQUcseUJBQXlCLENBQUM7QUFDdkMsSUFBTSxPQUFPLEdBQUc7SUFDZCxLQUFLLEVBQUU7UUFDTCxZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixXQUFXO1FBQ1gsWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFVBQVU7UUFDVixXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLGFBQWE7UUFDYixhQUFhO1FBQ2IsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO0tBQ1o7SUFDRCxPQUFPLEVBQUU7UUFDUCwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiwyQ0FBMkM7UUFDM0MsZ0ZBQWdGO0tBQ2pGO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxJQUFJLEVBQUU7SUFDYixFQUFFLENBQUMsa0RBQWtELEVBQUU7UUFDckQsaUJBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtRQUNqRCxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy9ub0lycmVndWxhcldoaXRlc3BhY2VSdWxlVGVzdHMuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvV29yay9EZXZlbG9wbWVudC93b3Jrc3BhY2UvdHNsaW50LWVzbGludC1ydWxlcy9zcmMifQ==
