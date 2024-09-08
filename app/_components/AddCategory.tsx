"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";

const formSchema = z.object({
	title: z.string().min(10, {
		message: "Title must be at least 10 characters."
	}),
	description: z.string().min(20, {
		message: "Description must be at least 20 characters."
	})
});

interface AddCategoryProps {
	fetchCategories: () => void;
}
export default function AddCategory({ fetchCategories }: AddCategoryProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: ""
		}
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post("/api/categories", {
				title: values.title,
				description: values.description
			});
			fetchCategories();
			form.reset();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="success">Add Category</Button>
			</DialogTrigger>
			<DialogHeader>
				<DialogTitle />
				<DialogDescription />
			</DialogHeader>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) =>
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="title..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) =>
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input placeholder="description..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>}
						/>
						<DialogClose asChild>
							<Button type="submit">Submit</Button>
						</DialogClose>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
