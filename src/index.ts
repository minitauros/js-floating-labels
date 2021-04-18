let ranSetup = false;

const formRowClass = 'form-row';
export const floatLabelClass = 'float-label';

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
      const formRowElement = getParentByClassName(e.target as HTMLInputElement, formRowClass);
      if (formRowElement) {
        formRowElement.classList.add(floatLabelClass);
      }
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
      const formRowElement = getParentByClassName(e.target as HTMLInputElement, formRowClass);
      if (formRowElement) {
        formRowElement.classList.remove(floatLabelClass);
      }
    }
  });

  // Prevent other similar setup scripts from adding the same event listeners.
  window.document.body.dataset.setUpFloatingLabels = 'true';

  // Just a quicker way of finding out if setup has already ran.
  ranSetup = true;
}

/**
 * Recurses over the given child's parent elements until a parent is found that has the given class name. It returns the
 * parent with that class name or null if no parent has that class name.
 *
 * @param child
 * @param className
 */
function getParentByClassName(child: HTMLElement, className: string): HTMLElement | null {
  let em = child;
  while (true) {
    const parent = em.parentElement;
    if (!parent) {
      return null;
    } else if (parent.classList.contains(className)) {
      return parent;
    }
    em = parent;
  }
}
