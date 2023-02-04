class TaskModel {
  id = 0;
  title = '';
  description = '';
  completed_at = null;

  constructor() {
    this.created_at = new Date();
    this.updated_at = new Date();    
  }
}

export { TaskModel };