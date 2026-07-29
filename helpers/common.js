export async function waitForLoader(page) {
    await page.waitForLoadState("networkidle");
}

export async function selfHealClick(...locators){

    for(const locator of locators){

        try{

            if(await locator.count()){

                await locator.first().click();

                return;
            }

        }catch{}

    }

    throw new Error("No locator found");

}