export default class Template {
	todoList(items) {
		return items.reduce((html, item) => html + `
			<li>
				<input class="toggle" type="checkbox" data-todoid="${item.id}" ${item.completed ? 'checked': ''}>
				<label>${item.todo}</label>
				<input class="edit-todo" data-todoId="${item.id}" name="edit-todo" value="${item.todo}"/>
				<button class="destroy" data-todoid="${item.id}">×</button>
			</li>
		`, '');
	}
}

// Move to other file !!!!!!!!!!!!!!!
export function delegateListener(target, selector, type, handler, capture) {
	const cb = event => {
		const targetElement = event.target;
		const potentialElements = target.querySelectorAll(selector);
		let i = potentialElements.length;

		while (i--) {
			if (potentialElements[i] === targetElement) {
				handler.call(targetElement, event);
				break;
			}
		}
	};

	target.addEventListener(type, cb, !!capture);
}