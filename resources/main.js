const console_text = document.querySelector(`#console`);
const console_log = document.querySelector(`#log`);
const divs_container = document.querySelector(`.divs`);
const divs = {};
const image = document.querySelector(`.image img`);
const box_shadow = `0 0 4px 4px rgba(88, 101, 242, 0.2), 0 0 20px 20px rgba(88, 101, 242, 0.19)`;
divs["image"] = [document.querySelector(`.image`), true];
divs["description"] = [document.querySelector(`.description`), true];
divs["name"] = [document.querySelector(`.name`), true];
const grab_areas = {};
grab_areas["image"] = document.querySelector(`#grab_area_image`);
grab_areas["description"]  = document.querySelector(`#grab_area_description`);
grab_areas["name"]  = document.querySelector(`#grab_area_name`);

//const grab_areas = document.querySelectorAll(`.grab_area`);
for (const [name, element] of Object.entries(grab_areas)) {
  try {
    element.addEventListener("dblclick", (e) => {
      if (divs[name][1]) {
        divs[name][1] = false;
        divs[name][0].style.boxShadow = `none`;
      } else {
        divs[name][1] = true;
        divs[name][0].style.boxShadow = box_shadow;
      }
    });
    element.addEventListener("mousedown", (e) => {
      const mouse_x = e.clientX;
      const mouse_y = e.clientY;
      let rect = divs[name][0].getBoundingClientRect();
      onmousemove = (ee) => {
        divs[name][0].style.left = `${rect.left + ee.clientX - mouse_x}px`;
        divs[name][0].style.top = `${rect.top + ee.clientY - mouse_y}px`;
      }
    });
    element.addEventListener("mouseup", (e) => {
      onmousemove = undefined;
    });
  } catch (ex) {
    console_log.style.color = `red`;
    console_text.textContent = ex;
  }
}
for (const [name, element] of Object.entries(divs)) {
  try {
    element[0].addEventListener("mousedown", () => {
      for (const [subname, subelement] of Object.entries(divs)) {
        if (name == subname) subelement[0].style.zIndex = 1;
        else subelement[0].style.zIndex = 0;
      }
    });
  } catch (ex) {
    console_log.style.color = `red`;
    console_text.textContent = ex;
  }
}

function filename(str) {
  for (let i = (str.length - 1); i > -1; i--) {
    if (str[i] == `/` || str[i] == `\\`) return i+1;
  }
  return -1;
}

/*image.addEventListener("click", async () => {
  open({
    multiple: false,
    filters: [{
      name: 'Image',
      extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'bmp', 'heif', 'heic']
    }]
  })
  .then(async (file) => {
    const assetUrl = convertFileSrc(file);
    console_text.textContent = assetUrl;
    image.src = assetUrl;
  })
  .catch((ex) => {
    console_log.style.color = `red`;
    console_text.textContent = ex;
  });
})*/