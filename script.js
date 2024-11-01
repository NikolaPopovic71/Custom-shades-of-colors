gsap.from(".letter", 1.8, {
  y: -20,
  opacity: 0,
  ease: "power3.inOut",
  stagger: 0.2,
});

gsap.to(".top-left, .top-right", 2, {
  top: "0",
  ease: "power3.inOut",
  delay: 2,
});
gsap.to(".bottom-right, .top-right", 2, {
  bottom: "0",
  ease: "power3.inOut",
  delay: 2,
});
gsap.to(".top-left", 2, {
  left: "0",
  ease: "power3.inOut",
  delay: 4,
});
gsap.to(".top-right", 2, {
  right: "0",
  ease: "power3.inOut",
  delay: 4,
});
gsap.to(".bottom-right", 2, {
  right: "0",
  ease: "power3.inOut",
  delay: 4,
});
gsap.to(".block-left", 2, {
  left: "-50%",
  ease: "power3.inOut",
  delay: 4,
});
gsap.to(".block-right", 2, {
  right: "-50%",
  ease: "power3.inOut",
  delay: 4,
  onComplete: () => {
    // Move blocks offscreen or hide them
    document.querySelector(".blocks").style.display = "none";

    // Bring main content to the highest layer
    const main = document.querySelector("main");
    main.style.opacity = 1;
    main.style.zIndex = 10; // Ensure main is above other elements
  }
});


const INITIAL_COLOR = "#b4a078";

document.addEventListener("DOMContentLoaded", () => {
  const colorInput = document.getElementById("color");
  const hexCodeDisplay = document.getElementById("hexCode");

  colorInput.value = INITIAL_COLOR;
  hexCodeDisplay.textContent = INITIAL_COLOR;
  updateColorPalette(INITIAL_COLOR);

  colorInput.addEventListener("input", (event) => {
    const newColor = event.target.value;
    hexCodeDisplay.textContent = newColor;
    updateColorPalette(newColor);
  });
});

function hexToRgb(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function mixColors(color1, color2, weight) {
  const r = Math.round(color1.r * (1 - weight) + color2.r * weight);
  const g = Math.round(color1.g * (1 - weight) + color2.g * weight);
  const b = Math.round(color1.b * (1 - weight) + color2.b * weight);
  return { r, g, b };
}

function updateColorPalette(baseColor) {
  const color = hexToRgb(baseColor);
  const white = { r: 255, g: 255, b: 255 };

  const variablesBlock = document.querySelector(".variables-block");
  variablesBlock.innerHTML = ""; // Clear previous colors

  for (let i = 0; i < 10; i++) {
    const shade = mixColors(color, white, i / 10);
    const hexValue = rgbToHex(shade.r, shade.g, shade.b);

    // Create shade div
    const shadeDiv = document.createElement("div");
    shadeDiv.style.backgroundColor = hexValue;
    shadeDiv.classList.add("color-shade");

    // Create label for HEX value
    const label = document.createElement("p");
    label.textContent = hexValue;
    label.classList.add("hex-label");

    // Add click event to copy HEX value
    label.addEventListener("click", () => {
      navigator.clipboard.writeText(hexValue);
      alert(`Copied ${hexValue} to clipboard!`);
    });

    // Append shade div and label to variablesBlock
    const container = document.createElement("div");
    container.classList.add("shade-container");
    container.appendChild(shadeDiv);
    container.appendChild(label);

    variablesBlock.appendChild(container);
  }
}
