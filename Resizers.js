function isResizerOpen() {
	return document.contains(document.getElementById("ResizerClick"));
}

function GetChildTableHeight(ClassName) {
	var Table = document.getElementsByClassName(ClassName)[0];
	if (Table == null) return "";
	else
		return Table.style.height;
}

/* When the tables are being reset, reset the heights of hte main table to its default settings as well */
function ResetTable(Default_ParentHeight) {
	var ParentFlexBox = document.getElementById("FlexBoxTop");
	var ParentTable = FlexBoxTop.getElementsByClassName('MainTable')[0];
	ParentTable.style.height = Default_ParentHeight;
	ParentFlexBox.style.flex = "1";
}

/* Grabs the tables under the flex box and resize their heights alongside the flexbox */
function ResizeChildDuringDrag(ParentTable, ChildTable, TotalHeight, prevGrowNew, nextGrowNew) {
	ParentTable.style.height = TotalHeight * prevGrowNew / 1.5 + 'px';			//Adjust table height and adjust for the 1.5 ratio
	ChildTable.style.height = TotalHeight * nextGrowNew / 1.5 - 55 + 'px';		//-55px to take into account the toolbar header
}

function GrabFlexContainerByID() {
	/* Takes the mouse target [Flex-Resizer] and grabs the top and bottom flexbox */
	var FlexResizer = document.getElementById("ResizerClick");
	let { ParentTable, ChildTable } = GrabFlexSiblings(FlexResizer);
	return { ParentTable, ChildTable };
}

function GrabFlexContainer(md) {
	/* Takes the mouse target [Flex-Resizer] and grabs the top and bottom flexbox */
	var FlexResizer = md.target;
	let { ParentTable, ChildTable } = GrabFlexSiblings(FlexResizer);
	return { ParentTable, ChildTable };
}

function GrabFlexSiblings(FlexResizer) {
	var FlexBoxTop = FlexResizer.previousElementSibling;
	var FlexBoxBottom = FlexResizer.nextElementSibling;

	/* Picks up the tables that are labelled with MainTable and  SubTable */
	var ParentTable = FlexBoxTop.getElementsByClassName('MainTable')[0];		//Parent Table
	var ChildTable = FlexBoxBottom.getElementsByClassName("SubTable")[0];		//Child Table

	return { ParentTable, ChildTable };
}

/* Identifies the set of flexboxes that need to be resized and attaches EventListeners that will constanltup update the set
when the mouse is clicking-and-dragging the flex resizer */
function manageResize(md, sizeProp, posProp) {
	var r = md.target;			//Grabs the mouse's clicked on item [Flex Resizer Component]

	var prev = r.previousElementSibling;		//Gets the previous element [The parent flex item]
	var next = r.nextElementSibling;			//Gets the next element [The child flex item]
	if (!prev || !next) {						//Safe guard
		return;
	}

	md.preventDefault();

	var prevSize = prev[sizeProp];
	var nextSize = next[sizeProp];
	var sumSize = prevSize + nextSize;				//The total height of the root flex component
	var prevGrow = Number(prev.style.flexGrow);		
	var nextGrow = Number(next.style.flexGrow);		//Grab the flex-grow property to change how they resize
	var sumGrow = prevGrow + nextGrow;				//Total Height will be ~1.5
	var lastPos = md[posProp];

	/* Track mouse movement  */
	function onMouseMove(mm) {

		/* Measure displacement from previous coordinates */
		var pos = mm[posProp];
		var d = pos - lastPos;
		prevSize += d;
		nextSize -= d;
		if (prevSize < 0) {
			nextSize += prevSize;
			pos -= prevSize;
			prevSize = 0;
		}
		if (nextSize < 0) {
			prevSize += nextSize;
			pos += nextSize;
			nextSize = 0;
		}

		var prevGrowNew = sumGrow * (prevSize / sumSize);		//Resize Parent
		var nextGrowNew = sumGrow * (nextSize / sumSize);		//Resize Child

		let { ParentTable, ChildTable } = GrabFlexContainer(md);
		ResizeChildDuringDrag(ParentTable, ChildTable, sumSize, prevGrowNew, nextGrowNew);

		prev.style.flexGrow = prevGrowNew;
		next.style.flexGrow = nextGrowNew;

		lastPos = pos;
	}

	/* When let go, remove the mouse tracker and revert everything */
	function onMouseUp(mu) {
		// Change cursor to signal a state's change: stop resizing.
		const html = document.querySelector('html');
		html.style.cursor = 'default';

		if (posProp === 'pageX') {
			r.style.cursor = 'ew-resize';
		} else {
			r.style.cursor = 'ns-resize';
		}

		window.removeEventListener("mousemove", onMouseMove);
		window.removeEventListener("mouseup", onMouseUp);
	}

	window.addEventListener("mousemove", onMouseMove);	//While the mouse is held down, track all mouse movement
	window.addEventListener("mouseup", onMouseUp);		//When the mouse lets go, release it
}

function setupResizerEvents() {
	document.body.addEventListener("mousedown", function (md) {

		// Used to avoid cursor's flickering
		const html = document.querySelector('html');

		var target = md.target;
		if (target.nodeType !== 1 || target.tagName !== "FLEX-RESIZER") {
			return;
		}
		var parent = target.parentNode;
		var h = parent.classList.contains("h");			//Targets flexbox that were labelled with horizontal
		var v = parent.classList.contains("v");			//Targets flexbox that were labelled with vertical
		if (h && v) {									//Resizing is one-directional
			return;
		} else if (h) {
			// Change cursor to signal a state's change: begin resizing on H.
			target.style.cursor = 'col-resize';
			html.style.cursor = 'col-resize'; // avoid cursor's flickering

			// use offsetWidth versus scrollWidth to avoid splitter's jump on resize when content overflow.
			manageResize(md, "offsetWidth", "pageX");

		} else if (v) {
			// Change cursor to signal a state's change: begin resizing on V.
			target.style.cursor = 'row-resize';
			html.style.cursor = 'row-resize'; // avoid cursor's flickering

			manageResize(md, "offsetHeight", "pageY");
		}
	});
}

setupResizerEvents();
