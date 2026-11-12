(function () {
  var form = document.getElementById("consult-form");
  if (!form) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll(".wizard-step"));
  var total = steps.length;
  var current = 0;
  var back = form.querySelector(".wizard-back");
  var next = form.querySelector(".wizard-next");
  var submit = form.querySelector(".wizard-submit");
  var status = document.getElementById("wizard-status");
  var bar = document.getElementById("wizard-bar");
  var segments = Array.prototype.slice.call(form.querySelectorAll(".wizard-segments span"));
  var review = document.getElementById("review-list");

  var summary = [
    ["how_you_ride", "How you'll ride"],
    ["line", "Line"],
    ["electric_assist", "Electric assist"],
    ["sound", "Sound"],
    ["style", "Style"],
    ["style_notes", "Style notes"],
    ["budget", "Budget"],
    ["name", "Name"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["notes", "Notes"]
  ];

  form.noValidate = true;

  function fieldValue(name) {
    var el = form.elements[name];
    if (!el) return "";
    return (el.value || "").trim();
  }

  function clearError(step) {
    var error = step.querySelector(".field-error");
    if (!error) return;
    error.textContent = "";
    step.removeAttribute("aria-invalid");
    step.removeAttribute("aria-describedby");
  }

  function setError(step, message) {
    var error = step.querySelector(".field-error");
    if (!error) return;
    error.textContent = message;
    step.setAttribute("aria-invalid", "true");
    if (error.id) step.setAttribute("aria-describedby", error.id);
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function check(step) {
    var radio = step.querySelector('input[type="radio"]');
    if (radio && !fieldValue(radio.name)) {
      return { ok: false, message: "Choose one to continue.", field: radio };
    }

    var nameInput = step.querySelector('input[name="name"]');
    if (nameInput) {
      if (!nameInput.value.trim()) {
        return { ok: false, message: "Enter your name.", field: nameInput };
      }
      var email = step.querySelector('input[name="email"]');
      if (!email.value.trim() || !validEmail(email.value.trim())) {
        return { ok: false, message: "Enter a valid email.", field: email };
      }
    }

    return { ok: true };
  }

  function renderReview() {
    review.replaceChildren();
    summary.forEach(function (item) {
      var row = document.createElement("div");
      var dt = document.createElement("dt");
      var dd = document.createElement("dd");
      dt.textContent = item[1];
      var value = fieldValue(item[0]);
      dd.textContent = value || "\u2014";
      row.append(dt, dd);
      review.append(row);
    });
  }

  function showStep(index, shouldFocus) {
    current = index;
    steps.forEach(function (step, i) {
      var on = i === index;
      step.classList.toggle("is-current", on);
      if (on) clearError(step);
    });

    var label = "Step " + (index + 1) + " of " + total;
    status.textContent = label;
    bar.setAttribute("aria-valuenow", String(index + 1));
    bar.setAttribute("aria-valuetext", label);
    segments.forEach(function (seg, i) {
      seg.classList.toggle("is-on", i <= index);
    });

    back.classList.toggle("is-hidden", index === 0);
    var last = index === total - 1;
    next.classList.toggle("is-hidden", last);
    submit.classList.toggle("is-visible", last);
    if (last) renderReview();
    if (shouldFocus) steps[index].focus();
  }

  function fail(step, result) {
    var index = steps.indexOf(step);
    if (index !== current) showStep(index, false);
    setError(step, result.message);
    if (result.field) result.field.focus();
  }

  function goNext() {
    var result = check(steps[current]);
    if (!result.ok) {
      fail(steps[current], result);
      return;
    }
    if (current < total - 1) showStep(current + 1, true);
  }

  function goBack() {
    if (current > 0) showStep(current - 1, true);
  }

  next.addEventListener("click", goNext);
  back.addEventListener("click", goBack);

  form.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.tagName === "TEXTAREA") return;
    if (event.target.closest("button")) return;
    if (current >= total - 1) return;
    event.preventDefault();
    goNext();
  });

  form.addEventListener("change", function (event) {
    var step = event.target.closest(".wizard-step");
    if (step) clearError(step);
  });

  form.addEventListener("input", function (event) {
    var step = event.target.closest(".wizard-step");
    if (step && step.getAttribute("aria-invalid") === "true") clearError(step);
  });

  form.addEventListener("submit", function (event) {
    var i;
    var result;
    for (i = 0; i < total - 1; i += 1) {
      result = check(steps[i]);
      if (!result.ok) {
        event.preventDefault();
        fail(steps[i], result);
        return;
      }
    }
    ["style_notes", "name", "email", "phone", "notes"].forEach(function (name) {
      var el = form.elements[name];
      if (el && typeof el.value === "string") el.value = el.value.trim();
    });
  });

  showStep(0, false);
})();
