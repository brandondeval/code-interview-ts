# Commentary for interviewers

This repo is designed to give developers of all levels a fair chance at showing their ability to program and make good decisions.

Why is this different from other code interviews? 

The skill ceiling on refactoring is deceiving. Most developers likely think they know how to “refactor”, but unless they have spent the time learning code smells and refactoring patterns, mostly developers will just try to rewrite the code in a way that suits their own taste. 

The problem with just rewriting the code is that refactoring is a skill, and if a developer hasn’t intentionally practiced this skill, they likely will assume fixing messy code is easier than it really is. Just immediately trying to rewrite the code tells a lot. This is a test about communication and planning. 

The messy code is designed to be hard to clean up; For a developer that doesn't know refactoring patterns, refactoring this code might feel impossible during the interview. 


A brute force approach without a plan or discussion will likely lead to an interviewee making ad hoc changes with slow to no progress. 


Therefore, this is as much about the interviewer as it is about the interviewee. It is essential that the interviewer needs to read the basic and expert solutions to understand the problem space. Going in blind will make this refactoring interview horrible for most candidates without collaborative guidance.


If you personally haven’t done many refactoring kata’s, I highly recommend trying to solve the problem before you look at the solutions. It will give you perspective on how a candidate will feel.


This code is generic enough that it applies to any language. Deep understanding of Typescript is not required. 

The solution folder should be deleted before being given to the candidate. 

Note: Using a LLM’s to refactor the code usually reproduces something similar to the basic solution unless explicitly told to follow expert best practices. Notably most AI coding agents will not replace conditionals with polymorphism. 