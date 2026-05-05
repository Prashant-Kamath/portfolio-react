// size: landscape, portrait, banner, square. {banner: "aspect-[21/10] is set in WorksCard}
// selected: true or nothing, to show in home page.
// slug: add slug to selected to it can route to. also add lazy import in App.jsx
// hidden: 'grid' or 'canvas' to hide in either one, or both ["grid", "canvas"].

export const worksData = [
	{
		id: 1,
		title: "The Frozen Stars",
		image: "https://cdn.dribbble.com/userupload/41977776/file/original-9f7cb2bb13045eda37b5ae60c13d80f1.gif",
		tags: ["WebGL"],
		date: "Sept 2022",
		size: "landscape",
		canvasPosition: { x: 0, y: 0 },
		selected: true,
		slug: 'the-frozen-stars'
	},
	{
		id: 2,
		title: "Absent Flame",
		image: "https://gifdb.com/images/high/dark-violet-gradient-waves-pn6uh6bd12xyrfxy.gif",
		tags: ["WebGL"],
		date: "Sept 2022",
		size: "square",
		canvasPosition: { relativeTo: 1, side: "right" },
	},
	{
		id: 3,
		title: "The Wizard of the Nobody",
		image: "https://cdn.dribbble.com/userupload/42509920/file/original-036f5b603dc597ced60709e6221cb4ce.gif",
		tags: ["WebGL"],
		date: "Sept 2022",
		size: "portrait",
		canvasPosition: { relativeTo: 2, side: "right" },
		selected: true,
	},
	{
		id: 4,
		title: "The Dream's Destiny",
		image: "https://cdn.dribbble.com/userupload/42100031/file/original-014456a61fa41abe2e816dd466ed4296.gif",
		tags: ["WebGL"],
		date: "Sept 2022",
		size: "landscape",
		canvasPosition: { relativeTo: 1, side: "bottom" },
	},
	{
		id: 5,
		title: "Luck of World",
		image: "https://i.pinimg.com/originals/83/52/39/8352391aecd2f7e11cf371a42c68dc48.gif",
		tags: ["WebGL", "Figma"],
		date: "Sept 2022",
		size: "square",
		canvasPosition: { relativeTo: 2, side: "bottom" },
		selected: true,
	},
	{
		id: 6,
		title: "Fallen Valley",
		image: "https://fiverr-res.cloudinary.com/image/upload/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/2df130c5862a23080ca153f69cd003d1-1741197216/AStrodog%20GIF.gif",
		tags: ["WebGL"],
		date: "Sept 2022",
		size: "banner",
		hidden: ["canvas"],
		canvasPosition: { relativeTo: 4, side: "right" },
	},
	{
		id: 7,
		title: "History of Beginning",
		image: "https://cdn.dribbble.com/userupload/42098016/file/original-95161d967fb850a082d81e3143129a34.gif",
		tags: ["WebGL"],
		date: "Sept 2022",
		size: "square",
		canvasPosition: { relativeTo: 3, side: "bottom" },
	},
];