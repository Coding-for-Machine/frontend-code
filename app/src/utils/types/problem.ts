export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
};

// local problem data
// utils/types/problem.ts
export type Problem = {
	id: number;         // Masalaning unikal ID'si
	slug: string;       // Dinamik URL uchun 'slug'
	title: string;      // Masalaning nomi
	difficulty: string; // Masalaning darajasi ('Oson', 'O'rta', 'Qiyin')
	category: string;   // Kategoriya nomi
	description: string; // Masalaning matni va tushuntirishi
	handlerFunction: string; // Masala uchun funksiya (string sifatida)
  };
  

export type DBProblem = {
	id: string;
	title: string;
	category: string;
	difficulty: string;
	likes: number;
	dislikes: number;
	order: number;
	videoId?: string;
	link?: string;
};
