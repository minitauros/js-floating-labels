var floatLabelClass = 'float-label';
var ranSetup = false;
/**
 * Sets up "floating labels", i.e. when a user focuses an input field a CSS class will be added indicating the label
 * may float.
 *
 * On blur it will remove the CSS class if the input contains no content.
 *
 * The setup will only run once per window load.
 */
export function setUpFloatingLabels() {
    if (ranSetup) {
        return;
    }
    else if (typeof window === 'undefined') {
        return;
    }
    else if (typeof window.document.body.dataset.setUpFloatingLabels !== 'undefined'
        && window.document.body.dataset.setUpFloatingLabels === 'true') {
        ranSetup = true;
        return;
    }
    window.addEventListener('focusin', function (e) {
        if (e.target
            && (e.target.constructor === HTMLInputElement
                || e.target.constructor === HTMLSelectElement
                || e.target.constructor === HTMLTextAreaElement)) {
            var target = e.target;
            var parent_1 = target.parentElement;
            if (!parent_1) {
                return;
            }
            parent_1.classList.add(floatLabelClass);
        }
    });
    window.addEventListener('focusout', function (e) {
        if (e.target
            && (e.target.constructor === HTMLInputElement
                || e.target.constructor === HTMLSelectElement
                || e.target.constructor === HTMLTextAreaElement)) {
            var target = e.target;
            if (target.value === '') {
                var parent_2 = target.parentElement;
                if (!parent_2) {
                    return;
                }
                parent_2.classList.remove(floatLabelClass);
            }
        }
    });
    // Prevent other similar setup scripts from adding the same event listeners.
    window.document.body.dataset.setUpFloatingLabels = 'true';
    // Just a quicker way of finding out if setup has already ran.
    ranSetup = true;
}
//# sourceMappingURL=index.js.map