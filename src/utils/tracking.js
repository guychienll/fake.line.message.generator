export const track = (...args) => {
    window.gtag(...args);
    console.debug(`==== event ${args[1]} sent ====`);
};
