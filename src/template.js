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

	itemCounter(active) {
		return `${active} ${active === 1 ? 'item': 'items'} left`;
	}
}