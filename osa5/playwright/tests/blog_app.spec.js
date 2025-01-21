const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')


describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Test',
                username: 'test',
                password: 'salasana'
            }
        })
        await page.goto('')
    })
   
    test('login form is shown', async ({ page }) => {
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    } )

    test('login succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'test', 'salasana')
        await expect(page.getByText('test logged in')).toBeVisible()
    })

    test('login fails with incorrect credentials', async ({ page }) => {
        await loginWith(page, 'test', 'vaarasalasana')
        await expect(page.getByText('wrong credentials')).toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'test', 'salasana')
        })

        test('a new blog can be created', async ({page}) => {
            await createBlog(page, 'testblog', 'testauthor', 'testurl')
            await expect(page.getByText('testblog testauthor show')).toBeVisible()
        })

        test('a blog can be liked', async ({page}) => {
            await createBlog(page, 'testblog', 'testauthor', 'testurl')
            await page.getByRole('button', {name: 'show' }).click()
            await page.getByRole('button', {name: 'like' }).click()
            await expect(page.getByText('likes: 1')).toBeVisible()
        })

        test('blog can be removed', async ({page}) => {
            await createBlog(page, 'testblog', 'testauthor', 'testurl')
            await page.getByRole('button', {name: 'show' }).click()
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toEqual('remove blog testblog ?')
                await dialog.accept()
            })
            await page.getByRole('button', {name: 'remove' }).click()
            //console.log('testblogs: ' + await page.getByText('testblog').textContent() )
            page.pause() //pause because i dont know how to make waitfor() for something not to exist
            await expect(page.getByText('testblog')).toHaveCount(0)
        })

        test('blog cannot be removed by others', async ({page, request}) => {
            await request.post('/api/users', {
                data: {
                    name: 'Test-too',
                    username: 'test2',
                    password: 'salasana'
                }
            })

            await createBlog(page, 'testblog', 'testauthor', 'testurl')
            await page.getByRole('button', {name: 'Logout' }).click()
            await loginWith(page, 'test2', 'salasana')
            await page.getByRole('button', {name: 'show' }).click()
            await expect(page.getByRole('button', {name: 'remove' })).not.toBeVisible()
        })

        test('blogs are in correct order', async ({page}) => {
            await createBlog(page, 'testblogfirst', 'testauthor', 'testurl')
            await createBlog(page, 'testblogsecond', 'testauthor', 'testurl')
            await createBlog(page, 'testblogthird', 'testauthor', 'testurl')

            const blogs = await page.getByRole('button', {name: 'show' }).all()
          
            
            //button disappears upon use
            await blogs[1].click()
            await page.waitForTimeout(250)
            await blogs[1].click()
            await page.waitForTimeout(250)

            const blogs2 = await page.getByRole('button', {name: 'like' }).all()
      
            await blogs2[0].click()
            await page.waitForTimeout(250)
            await blogs2[0].click()    
            await page.waitForTimeout(250)
            await blogs2[1].click()
            await page.waitForTimeout(250)
            await page.reload() //blogs are ordered on reload
         
            await page.waitForTimeout(500)
            const blogs3 = await page.getByText('testblog').all()
            console.log(await blogs3[0].textContent())
            console.log(await blogs3[2].textContent())
            console.log(await blogs3[4].textContent())

            //check every second one because .all() picks also not visible components
            await expect(blogs3[0].getByText('second test')).toBeVisible()
            await expect(blogs3[2].getByText('third test')).toBeVisible()
            await expect(blogs3[4].getByText('first test')).toBeVisible()
        })
    })
})