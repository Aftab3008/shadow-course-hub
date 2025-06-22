interface UserProgress {
  userId: string;
  courseId: string;
  lectureId: string;
  currentTime: number;
  lastUpdated: Date;
}

class ProgressService {
  private storageKey = "user_progress";

  // Mock user ID - replace with actual user from auth when Supabase is connected
  private getCurrentUserId(): string {
    return "mock_user_id";
  }

  async saveProgress(
    courseId: string,
    lectureId: string,
    currentTime: number
  ): Promise<void> {
    const userId = this.getCurrentUserId();
    const progressKey = `${userId}_${courseId}_${lectureId}`;

    const progress: UserProgress = {
      userId,
      courseId,
      lectureId,
      currentTime,
      lastUpdated: new Date(),
    };

    // Using localStorage as mock database - replace with Supabase database call
    const existingProgress = JSON.parse(
      localStorage.getItem(this.storageKey) || "{}"
    );
    existingProgress[progressKey] = progress;
    localStorage.setItem(this.storageKey, JSON.stringify(existingProgress));

    console.log(`Progress saved: ${currentTime}s for lecture ${lectureId}`);
  }

  async getProgress(courseId: string, lectureId: string): Promise<number> {
    const userId = this.getCurrentUserId();
    const progressKey = `${userId}_${courseId}_${lectureId}`;

    // Using localStorage as mock database - replace with Supabase database query
    const existingProgress = JSON.parse(
      localStorage.getItem(this.storageKey) || "{}"
    );
    const progress = existingProgress[progressKey] as UserProgress;

    if (progress) {
      console.log(
        `Progress loaded: ${progress.currentTime}s for lecture ${lectureId}`
      );
      return progress.currentTime;
    }

    return 0;
  }
}

export const progressService = new ProgressService();
