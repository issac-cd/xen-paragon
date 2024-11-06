**Description:** Describe in a couple of sentences what this PR adds

**JIRA:** Link to JIRA ticket

**Merge deadline:** List merge deadline (if any)

**Testing instructions:**

1. Open page A
2. Do thing B
3. Expect C to happen
4. If D happened instead - check failed.

### Checklist:

- [ ] I have performed a self-review of my own code
- [ ] Ensure code is formatted correctly and add docstrings for the APIs
- [ ] Function names should be self explanatory (No need of commented descriptions if we name it meaningfully)
- [ ] No functions with more than 50 lines of code
- [ ] Avoid loops on DB queries
- [ ] Check code's performance on APM
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] My changes generate no new warnings
- [ ] New and existing unit tests pass locally with my changes
- [ ] Does this change have database migration scripts? If so please inform Tech champs before deploying to any environment

**Post merge:**
- [ ] Check the workflow and sonarcloud
- [ ] Delete working branch (if not needed anymore)
