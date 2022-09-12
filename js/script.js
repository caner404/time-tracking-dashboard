"use strict";

const btnContainer = document.querySelectorAll(".user__btn");
const dailyBtn = document.querySelector(".user__timeline--daily");
const weeklyBtn = document.querySelector(".user__timeline--weekly");
const monthlyBtn = document.querySelector(".user__timeline--monthly");

const state = {
  daily: [],
  weekly: [],
  monthly: [],
};

// root directory (index.html)
const fetchDashboardData = async function () {
  try {
    let res = await fetch("./js/data.json");
    let data = await res.json();
    if (!res.ok) throw new Error("Something went wrong");
    return data;
  } catch (err) {
    throw err;
  }
};

const renderDashboard = function (data) {
  const markup = data
    .map((activity) => {
      return `<div class="activity">
    <div class="activity__image activity__image--${activity.title
      .split(" ")
      .join("-")
      .toLowerCase()}"></div>
      <div class="activity__content">
        <div class="activity__details">
          <div class="activity__header">
            <p class="activity__name">${activity.title}</p>
            <img src="images/icon-ellipsis.svg" alt="three dots" />
          </div>
          <div class="activity__duration">
            <p class="activity__duration-presence">${
              activity.timeframe.current
            }hrs</p>
            <p class="activity__duration-past">Last Week - ${
              activity.timeframe.previous
            }hours</p>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");
  document
    .querySelectorAll(".activity")
    .forEach((activity) => activity.remove());
  document.querySelector(".user").insertAdjacentHTML("afterend", markup);
};

const initState = function (data) {
  data.forEach((activity) => {
    state.daily.push({
      title: activity.title,
      timeframe: activity.timeframes.daily,
    });
    state.weekly.push({
      title: activity.title,
      timeframe: activity.timeframes.weekly,
    });
    state.monthly.push({
      title: activity.title,
      timeframe: activity.timeframes.monthly,
    });
  });
  console.log(data);
  dailyBtn.addEventListener("click", function () {
    renderDashboard(state.daily);
    btnContainer.forEach((btn) => {
      btn.classList.remove("user__btn--active");
    });
    dailyBtn.classList.add("user__btn--active");
  });
  weeklyBtn.addEventListener("click", function () {
    renderDashboard(state.weekly);
    btnContainer.forEach((btn) => {
      btn.classList.remove("user__btn--active");
    });
    weeklyBtn.classList.add("user__btn--active");
  });
  monthlyBtn.addEventListener("click", function () {
    renderDashboard(state.monthly);
    btnContainer.forEach((btn) => {
      btn.classList.remove("user__btn--active");
    });
    monthlyBtn.classList.add("user__btn--active");
  });
};

let data = await fetchDashboardData();
initState(data);
