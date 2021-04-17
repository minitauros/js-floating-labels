const floatLabelClass = 'float-label';
let ranSetup = false;

/**
 * Sets up "floating labels", i.e. when a user focuses an input field a CSS class will be added indicating the label
 * may float.
 *
 * On blur it will remove the CSS class if the input contains no content.
 *
 * The setup will only run once per window load, even if called multiple times.
 */
export function setUpFloatingLabels(): void {
  if (ranSetup) {
    return;
  } else if (typeof window === 'undefined') {
    return;
  } else if (
    typeof window.document.body.dataset.setUpFloatingLabels !== 'undefined'
    && window.document.body.dataset.setUpFloatingLabels === 'true'
  ) {
    ranSetup = true;
    return;
  }

  window.addEventListener('focusin', (e: FocusEvent) => {
    if (
      e.target
      && (
        e.target.constructor === HTMLInputElement
        || e.target.constructor === HTMLSelectElement
        || e.target.constructor === HTMLTextAreaElement
      )
    ) {
      const target = e.target as HTMLInputElement;
      const parent = target.parentElement;
      if (!parent) {
        return;
      }
      parent.classList.add(floatLabelClass);
    }
  });

  window.addEventListener('focusout', (e: FocusEvent) => {
    if (
      e.target
      && (
        e.target.constructor === HTMLInputElement
        || e.target.constructor === HTMLSelectElement
        || e.target.constructor === HTMLTextAreaElement
      )
    ) {
      const target = e.target as HTMLInputElement;

      if (target.value === '') {
        const parent = target.parentElement;
        if (!parent) {
          return;
        }
        parent.classList.remove(floatLabelClass);
      }
    }
  });

  // Prevent other similar setup scripts from adding the same event listeners.
  window.document.body.dataset.setUpFloatingLabels = 'true';

  // Just a quicker way of finding out if setup has already ran.
  ranSetup = true;
}

