"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AddCategory from "./_components/AddCategory";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import UpdateCategory from "./_components/UpdateCategory";

interface CategoryProps {
	id: string;
	title: string;
	description: string;
}

export default function Home() {
	const [categories, setCategories] = useState<CategoryProps[] | null>(null);
	const [
		selectedCategory,
		setSelectedCategory
	] = useState<CategoryProps | null>(null);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

	const deleteCategories = async (id: string) => {
		try {
			await axios.delete(`/api/categories/${id}`);
			fetchCategories();
		} catch (error) {
			return new Error("Delete Failed");
		}
	};
	const fetchCategories = async () => {
		try {
			const response = await axios.get("/api/categories");
			setCategories(response.data);
		} catch (error) {
			return new Error("Something went wrong!");
		}
	};
	useEffect(() => {
		fetchCategories();
	}, []);
	return <main className="flex flex-col  justify-between p-8">
			<SignedIn>
				<UserButton signInUrl="/" />
			</SignedIn>

			<div className="container mx-auto">
				<h1 className="text-3xl mt-4 font-semibold mb-8">Categories</h1>

				<AddCategory fetchCategories={fetchCategories} />
				{selectedCategory && <UpdateCategory category={selectedCategory} isOpen={isUpdateModalOpen} onClose={() => {
							setIsUpdateModalOpen(false);
							setSelectedCategory(null);
						}} fetchCategories={fetchCategories} />}
				{categories === null ? <div>Loading...</div> : <Table>
							<TableCaption>Category List</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">ID</TableHead>
									<TableHead>Title</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{categories.map(category => <TableRow key={category.id}>
										<TableCell className="font-medium">
											{category.id}
										</TableCell>
										<TableCell>
											{category.title}
										</TableCell>
										<TableCell>
											{category.description}
										</TableCell>
										<TableCell className="flex space-x-3">
											<Button variant={"warning"} onClick={() => {
													setSelectedCategory(category);
													setIsUpdateModalOpen(true);
												}}>
												Update
											</Button>
											<Button variant={"destructive"} onClick={() => deleteCategories(category.id)}>
												Delete
											</Button>
										</TableCell>
									</TableRow>)}
							</TableBody>
						</Table>}
			</div>
		</main>;
}
