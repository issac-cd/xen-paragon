build:
	rm -rf ./dist
	./node_modules/.bin/fedx-scripts babel src --out-dir dist --source-maps --ignore **/*.test.jsx,**/__mocks__,**/__snapshots__,**/setupTest.js --copy-files
	@# --copy-files will bring in everything else that wasn't processed by babel. Remove what we don't want.
	@rm -rf dist/**/*.test.jsx
	@rm -rf dist/**/__snapshots__
	@rm -rf dist/__mocks__

watch:
	make build

	mkdir -p ../frontend-app-learner-dashboard/node_modules/@crystaldelta/xen-paragon
	rm -rf ../frontend-app-learner-dashboard/node_modules/@crystaldelta/xen-paragon/dist
	cp -r dist ../frontend-app-learner-dashboard/node_modules/@crystaldelta/xen-paragon
	rm -rf ../frontend-app-learner-dashboard/node_modules/@crystaldelta/xen-paragon/src
	cp -r src ../frontend-app-learner-dashboard/node_modules/@crystaldelta/xen-paragon
	rm -rf ../frontend-app-learner-dashboard/node_modules/@crystaldelta/xen-paragon/scss
	cp -r scss ../frontend-app-learner-dashboard/node_modules/@crystaldelta/xen-paragon

	mkdir -p ../frontend-app-authn/node_modules/@crystaldelta/xen-paragon
	rm -rf ../frontend-app-authn/node_modules/@crystaldelta/xen-paragon/dist
	cp -r dist ../frontend-app-authn/node_modules/@crystaldelta/xen-paragon
	rm -rf ../frontend-app-authn/node_modules/@crystaldelta/xen-paragon/src
	cp -r src ../frontend-app-authn/node_modules/@crystaldelta/xen-paragon
	rm -rf ../frontend-app-authn/node_modules/@crystaldelta/xen-paragon/scss
	cp -r scss ../frontend-app-authn/node_modules/@crystaldelta/xen-paragon

	tutor dev restart authn learner-dashboard
