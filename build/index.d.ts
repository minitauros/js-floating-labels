export declare const floatLabelClass = "float-label";
/**
 * Sets up "floating labels", i.e. when a user focuses an input field a CSS class will be added indicating the label
 * may float.
 *
 * On blur it will remove the CSS class if the input contains no content.
 *
 * The setup will only run once per window load, even if called multiple times.
 */
export declare function setUpFloatingLabels(): void;
