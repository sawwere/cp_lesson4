class MiniMaple{
    diff(equationString, variableName) {
        if (equationString === "") 
            return "";
        const patternNonVariables = new RegExp(String.raw`(?<=\+|\-|^)(\d+)((\*[^${variableName}](\^\d+)?)*)(\+|\-|$)`, "g");

        equationString = equationString.replaceAll(patternNonVariables, function() {
            //console.log(arguments)
            let g2 = Object.values(arguments)[2]; // latin character multipliers
            let g5 = Object.values(arguments)[5]; // next operation. example:    ...+52-...    ->    -
            if (g2 !== "") {
                return "";
            }
            return g5 === "-" ? "-" : "";
        });
        const patternVariables = new RegExp(String.raw`(\d+\*)?((\w(\^\d+)?\*)*)(${variableName}(\^\d+)?)((\*\w(\^\d+)?)*)`, "g");

        equationString = equationString.replaceAll(patternVariables, (...args) => {
            return this.#diffMatch(args, variableName);
        });

        const patternCleaning = new RegExp(/(\+(0|$))|(\-(0|$))/, "g");
        equationString = equationString.replaceAll(patternCleaning, "");
        return equationString === "" ? "0" : equationString;
    }

    #diffMatch(args, variableName) {
        console.log(args[2].slice(0, -1));
        let group1 = args[1]; // numeric factor
        let group2 = args[2].slice(0, -1); // latin character multipliers before variable
        let group6 = args[6]; // power of variable
        let group7 = args[7].slice(1); // latin character multipliers after variable
        
        let res = "";
        let numericFactor = 1;
        let otherFactor = group2;
        if (group7.length > 0) {
            if (group2.length > 0)
                otherFactor += "*";
            otherFactor += group7;
        }
        let power = 0;
        if (group1 !== undefined) {
            numericFactor = numericFactor * Number(group1.slice(0, -1));
        }
        if (group6 !== undefined) {
            power = Number(group6.slice(1)) - 1;
            numericFactor *= Number(group6.slice(1));
        }
        if (numericFactor === 0) 
            return "0";

        // concatenate numeric and symbolic multipliers
        if (otherFactor.length > 0) {
            if (numericFactor > 1)
                res += String(numericFactor) + "*";
            res += otherFactor;
        }
        else {
            res = String(numericFactor);
        }
        // take only factor from variable that looks like <factor>*x^0
        if (power === 0)
            return res;
        // concatenate multipliers and variable
        res += "*" + variableName;
        if (power > 1) {
            res += "^" + power;
        }
        return res;
    }
}


export {MiniMaple}