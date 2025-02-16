export const track = (...args) => {
    try {
        window.gtag(...args);
        console.debug(`==== event ${args[1]} sent ====`);
    } catch (e) {
        //NOTE: should not effect the user experience, when tracking error
        console.error(e);
    }
};
