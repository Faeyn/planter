export class FetchWrapper {
  private adress: string
  private body: string = ""

  constructor(adress: string) {
    this.adress = adress
  }

  public setBody(body: string | object) {
    if (typeof body !== "string") {
      this.body = JSON.stringify(body)
    }
    return body
  }

  getRequest() {
    const requestOptions = {
      method: "GET",
    }
    
    const response = this.sendRequest(requestOptions).then((response) => {
       return response?.json()
    }
    )

    return response
  }

  deleteRequest(): Promise<Response | undefined> {
    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: this.body,
    }

    return this.sendRequest(requestOptions)
  }

  putRequest() {
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: this.body,
    }
    const data = this.sendRequest(requestOptions).then((response) =>
      response?.json()
    )
    return data
  }

  postRequest() {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: this.body,
    }
    const data = this.sendRequest(requestOptions).then((response) =>
      response?.json()
    )
    return data
  }

  private async sendRequest(
    requestOptions: RequestInit
  ): Promise<Response | undefined> {
    try {
      const response = await fetch(this.adress, requestOptions)
      if (response.ok) {
        console.log("Request was successful!")
        return response
      } else {
        console.error(`Request failed with status ${response.status}`)
      }
    } catch (error) {
      console.error("An error occured:", error)
    }
  }
}
