export interface ILevel {
	id: number,
    name: string,
    totalPoints: number,
    features: any
}

export type UserLevel = ILevel & { totalScore: number };