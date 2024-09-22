import {MiniMaple} from "../src/miniMaple";

test('empty input', () => {
    const mm = new MiniMaple();
    expect(mm.diff("","")).toBe("");
});

test('single variable', () => {
    const mm = new MiniMaple();
    const equation = "x";
    const variable = "x";
    expect(mm.diff(equation,variable)).toBe("1");
});

test('only number', () => {
    const mm = new MiniMaple();
    const equation = "16";
    const variable = "x";
    expect(mm.diff(equation, variable)).toBe("0");
});

test('minus', () => {
    const mm = new MiniMaple();
    let equation = "15-x";
    let variable = "x";
    expect(mm.diff(equation, variable)).toBe("-1");

    equation = "x-1";
    variable = "x";
    expect(mm.diff(equation, variable)).toBe("1");
});

test('plus', () => {
    const mm = new MiniMaple();
    let equation = "x+6";
    let variable = "x";
    expect(mm.diff(equation, variable)).toBe("1");

    equation = "6+x";
    variable = "x";
    expect(mm.diff(equation, variable)).toBe("1");
});

test('multiply', () => {
    const mm = new MiniMaple();
    let equation = "6*x";
    let variable = "x";
    expect(mm.diff(equation, variable)).toBe("6");

    equation = "-11*x";
    variable = "x";
    expect(mm.diff(equation, variable)).toBe("-11");

    equation = "0*x";
    variable = "x";
    expect(mm.diff(equation, variable)).toBe("0");
});

test('pow', () => {
    const mm = new MiniMaple();
    let equation = "x^5";
    let variable = "x";
    expect(mm.diff(equation, variable)).toBe("5*x^4");

    equation = "x^0";
    variable = "x";
    expect(mm.diff(equation, variable)).toBe("0");

    equation = "1*x^3";
    variable = "x";
    expect(mm.diff(equation, variable)).toBe("3*x^2");
});

test('all operations', () => {
    const mm = new MiniMaple();
    const equation = "x^3-3*x^2+5*x-54";
    const variable = "x";
    expect(mm.diff(equation, variable)).toBe("3*x^2-6*x+5");
});

test('invalid variable', () => {
    const mm = new MiniMaple();
    let equation = "4*x^3";
    let variable = "y";
    expect(mm.diff(equation, variable)).toBe("0");

    equation = "y+4*x^3";
    variable = "y";
    expect(mm.diff(equation, variable)).toBe("1");
});

test('several variables', () => {
    const mm = new MiniMaple();
    let equation = "16*y*k";
    let variable = "x";
    expect(mm.diff(equation, variable)).toBe("0");

    equation = "16*y^5*h*x";
    variable = "x";
    expect(mm.diff(equation, variable)).toBe("16*y^5*h");

    equation = "x*z*t";
    variable = "x";
    expect(mm.diff(equation, variable)).toBe("z*t");

    equation = "x^2*z*t";
    variable = "x";
    expect(mm.diff(equation, variable)).toBe("2*z*t*x");

    equation = "x^3*z*t";
    variable = "x";
    expect(mm.diff(equation, variable)).toBe("3*z*t*x^2");

    equation = "16*y^5*h*x*z*t";
    variable = "x";
    expect(mm.diff(equation, variable)).toBe("16*y^5*h*z*t");
});