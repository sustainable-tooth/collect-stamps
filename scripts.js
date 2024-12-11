const images_List = ["EDM.png", "Eco_Dental_Movement.png", "dental_project.png", "love_and_teeth.png",
	"recycle.png", "sustai_h_able.png"
];
const stampsNameMaxNumber = images_List.length;
const stickStamp = (stampName, stampArea) => {
	stampImg_Element = document.createElement("img");
	stampImg_Element.src = "./stamp_images/" + images_List[stampName - 1];
	stampImg_Element.alt = "Stamp" + images_List[stampName - 1];
	stampImg_Element.width = "300";
	stampArea.appendChild(stampImg_Element);
}
document.addEventListener("DOMContentLoaded", () => {
	let buttonDisabled = false;
	let lastClickedYear_Int = parseInt(localStorage.lastClickedYear);
	let lastClickedMonth_Int = parseInt(localStorage.lastClickedMonth);
	let lastClickedDate_Int = parseInt(localStorage.lastClickedDate);
	let stampNumber_Int = parseInt(localStorage.stampNumber);
	let stampsName_List = String(localStorage.stampsName).split(",").map((k) => parseInt(k));
	let restNumber_Int = Math.max(0, 6 - stampNumber_Int);

	const collectButton_Element = document.getElementById("countButton_Element");
	const stampNumber_Element = document.getElementById("stampNumber_Element");
	const infoText_Element = document.getElementById("infoText_Element");
	const restNumber_Element = document.getElementById("restNumber_Element");
	const stampArea_Element = document.getElementById("stampArea_Element");
	const Button_disable = () => {　
		buttonText = "今日はこれ以上スタンプを獲得することはできません";
		collectButton_Element.textContent = buttonText;
		buttonDisabled = true;
		collectButton_Element.classList.add("disabled_button");
	};
	const add200PointToUser = () => {
		celebrationText = "おめでとう！200ポイントを獲得しました！";　
		infoText_Element.textContent = celebrationText;
	};
	if (isNaN(stampNumber_Int)) {
		stampNumber_Int = 0;
		restNumber_Int = 6;
	};
	if (!(isNaN(lastClickedYear_Int) || isNaN(lastClickedMonth_Int) || isNaN(lastClickedDate_Int))) {
		nowTime = new Date();
		if (lastClickedMonth_Int == nowTime.getMonth() && lastClickedDate_Int == nowTime.getDate()) {
			Button_disable();
		};
	};
	if (isNaN(stampsName_List[0]) || stampsName_List.length < stampNumber_Int) {
		const new_stampName_List = Array(stampsNameMaxNumber)
		for (let i = 0; i < stampsNameMaxNumber; i++) {
			j = Math.floor(Math.random() * (i + 1));
			new_stampName_List[i] = new_stampName_List[j]
			new_stampName_List[j] = i + 1
		}
		stampsName_List = new_stampName_List;
		localStorage.stampsName = stampsName_List;
	}
	stampNumber_Element.textContent = stampNumber_Int;
	restNumber_Element.textContent = restNumber_Int;
	for (let i = 0; i < Math.min(stampsNameMaxNumber, stampNumber_Int); i++) {
		stickStamp(stampsName_List[i], stampArea_Element);
	}
	for (let i = 0; i < restNumber_Int; i++) {
		emptyStamp_Element = document.createElement("div");
		emptyStamp_Element.classList.add("empty_stamp");
		stampArea_Element.appendChild(emptyStamp_Element);
	}
	if (stampNumber_Int >= 6) {
		add200PointToUser()
	}
	collectButton_Element.addEventListener("click", () => {
		if (!buttonDisabled) {
			stampNumber_Int += 1;
			restNumber_Int = Math.max(0, 6 - stampNumber_Int);
			stampNumber_Element.textContent = stampNumber_Int;
			restNumber_Element.textContent = restNumber_Int;
			localStorage.stampNumber = stampNumber_Int;
			nowTime = new Date();
			localStorage.lastClickedYear = nowTime.getYear();
			localStorage.lastClickedMonth = nowTime.getMonth();
			localStorage.lastClickedDate = nowTime.getDate();
			localStorage.stampNumber = stampNumber_Int;
			Button_disable();
			if (stampNumber_Int >= 6) {
				add200PointToUser()
			}
		};
	});
});