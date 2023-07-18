const BD = new Builder();

BD.customComponent({
  style: {
    userCard: {
      fontFamily: "'Arial', sans-serif",
      background: "#f4f4f4",
      width: "500px",
      display: "grid",
      gridTemplateColumns: " 1fr 2fr",
      gridGap: "10px",
      marginBottom: "15px",
      borderBottom: "darkorchid 5px solid",
    },
    userCardImg: {
      width: "100%",
    },
    userCardBtn: {
      cursor: "pointer",
      background: "darkorchid",
      color: "#fff",
      border: "0",
      borderRadius: "5px",
      padding: "5px 10px",
    },
  },
  template: {
    name: "user-card",
    root: `  
            <div class="userCard">
                <img class="userCardImg" />
                <div>
                <h3></h3>
                <div class="info">
                    <p><slot name="email" /></p>
                    <p><slot name="phone" /></p>
                </div>
                <button class="userCardBtn" id="toggle-info">Hide Info</button>
                </div>
            </div>`,
  },
  script: {
    initial: (element) => console.log(element.shadow),
    onMount: (element) => {
      let showInfo = true;
      element.shadow
        .querySelector("#toggle-info")
        .addEventListener("click", () => {
          showInfo = !showInfo;
          const info = element.shadow.querySelector(".info");
          const toggleBtn = element.shadow.querySelector("#toggle-info");

          if (showInfo) {
            info.style.display = "block";
            toggleBtn.innerText = "Hide Info";
          } else {
            info.style.display = "none";
            toggleBtn.innerText = "Show Info";
          }
        });
      element.shadow.querySelector("h3").innerText =
        element.getAttribute("name");
      element.shadow.querySelector("img").src = element.getAttribute("avatar");
    },
    onDismount: (element) => {
      element.shadowRoot.querySelector("#toggle-info").removeEventListener();
    },
  },
});
const ti = performance.now();
BD.registers([
  {
    extension: Accordion,
    params: [
      {
        name: "custom-accordion",
        style: {
          accordion: {
            fontFamily: "Inter",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "28px",
            backgroundColor: "#F6F6F6",
            padding: "24px 32px",
            ":hover": {
              backgroundColor: "#9A2E25",
              color: "#fff",
            },
            ":after": {
              content:
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIjSURBVHgB7ZiLcdswDEBfu0A1AjaoRlAnaDaIOoG9gTWCNwg3aDqB2wncThBvkHSCljxJZ1DWh6To5JLLu8P5bIMkCJAASXjnjfOBPBSdSPf9ycqp+3wxKit7Kw9W/k3I0cqdlRuekY2VxxmjpsRN5JZIYkJc0nqjVL+5EP62cm/lL21YHUWn95nW04Vq43S+KN0sOK8NvbEZDDyF06m5XApbMrEbdNyQTjPoa8dKtOecB0rWI/jeTPak4Bsn5EPwjUyauO5AyE+Jn46iqMmz5pZoSAx1770Hrk8/1mNogxvOs7rl+mzVeFVIA8N5RiF5bi0F58q0D2lw7JTvJ/4XKwfiNo50/U7t1gOBS6pgfnMI/voUwozT62ysjQ6zF7WPI531jG39k5VfSnfJk0OdH4zXYH0sm11WFWEL1rCcxAU/lxrWjxuuuGCkRBgXNa4oxZplzIiRscY5dGqbLXt6k4RmdjMwMtY4R8PEJhmjH+BAOIbLE7SJaP+diJq8Jy1RG9KM04n6LqRBRWIBpzXMEEetxvsa2qif0WJmz4BO/MHozN5wPXasOJgcWXniXUDwd380JcvVIhUh04ldhzqXkSWZLk09DfmuijvyXWE9tow/Y4Re3DckXtxjnj6Ey+OVOyb9tPKH9gnkSel+oq2xJf5EnN637vMq1My/aE2Jy63ZnjtCcN4x+OloKG4irnRWJJLzAVM4h/JEG+4XfcB851XwH/vqE/97kFNbAAAAAElFTkSuQmCC)",
              height: "40px",
            },
            "&.clicked": {
              backgroundColor: "#9A2E25 ",
              color: "white",
            },
            "&.clicked:after": {
              content:
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJESURBVHgB7ViLccIwDBVdoBnBG7QjpBOUDUongA1gBDaADcoGdAPoBMkGoROo8sU5ZJOPZJxy7fHudDmCJD//pEgAd/xzTCABEDGjhxXjXp1IyslkcoJbgUjlJGuSArtxINmQTOG3QIPNSSrUoyB5AyXEW0zOn+mxIXlmr+0WHkl2JN8kpXufOb0nktz9bmB1Xmj7S0gFt2rhaszd2RuyzUhmeHkUFpAC5GgZOF5BJKxt4GsJ1yBYucJt87U+TbCacSvpHHFyBhKhhaR+4oEDA4lhSTH/B63xLMWZE4yzitpqtnoFjAw2ViU1mLJZqQIr1lljo7RZsPFyicG2mREK4lxAroGYJNZxsslMa4nBwSnvQIiAXAzJvehIudmoLkdArkD/9otIBtuc9Snyq/8qcBySM3gZ4wZJoh81TJ9izhRzUJJj/6lIiseVKvaRiyGpIcjT2yyWnJYk+qGtO+2hf0kWHQNWEnIdJLtWe8XGzYYcNs72Hf/bi3RARX52JPddNvT+w405nJOxrjMQlYE6FugH6osj8NBi0wRoS24G42MK55JAlhz4OYORgTEfJuhH9hWMBPTLCV3Fh+ec3H/148l5X+ygBfppr9DcWiG5gvk3EINgq5OQdBPn5K4rPzFhqYgJS9jQ8SJwXNhDjfLCfY6Rhbum9WHoYbOLYa9t6+OT5AvqFkjTzbI6j1DHOHvB+ESs3ju1Po4wBrC9jSFBhanaHUKi9gtki344wpajYFNnDpFI2cA0cN7KkuR00wbmHX8FP+9BMgJ4vnpyAAAAAElFTkSuQmCC)",
            },
            "@500px": {
              background: "red",
            },
          },
        },
      },
    ],
  },
  {
    extension: Card,
    params: [
      {
        name: "product-card",
        style: {
          card: {
              width: '280px',
              maxWidth: '450px', 
          },
          'cardRow .cardMedia': {
              height: '216px',
              width: '300px',
          }
        },
      },
    ],
  },
]);

const to = performance.now();
console.log(to - ti);
// .register( Modal, [{name: 'sidenav', Orient: 'Top', height: '100px', width: '250px'}])

document.getElementById("rt").addEventListener("click", () => {
  document.querySelectorAll("product-card").forEach((el) => {
    el.setAttribute("display", "flex");
  });
});

document.getElementById("re").addEventListener("click", () => {
  document.querySelectorAll("product-card").forEach((el) => {
    el.setAttribute("display", "grid");
  });
});
