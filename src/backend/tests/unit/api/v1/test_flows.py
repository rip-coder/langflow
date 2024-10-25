import pytest
from fastapi import status
from httpx import AsyncClient


async def test_create_flow(client: AsyncClient, logged_in_headers):
    basic_case = {
        "name": "string",
        "description": "string",
        "icon": "string",
        "icon_bg_color": "#ff00ff",
        "gradient": "string",
        "data": {},
        "is_component": False,
        "webhook": False,
        "endpoint_name": "string",
        "tags": [
            "string"
        ],
        "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "folder_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
    response = await client.post("api/v1/flows/", json=basic_case, headers=logged_in_headers)
    result = response.json()

    assert response.status_code == status.HTTP_201_CREATED
    assert isinstance(result, dict), "The result must be a dictionary"
    assert "data" in result.keys(), "The result must have a 'data' key"
    assert "description" in result.keys(), "The result must have a 'description' key"
    assert "endpoint_name" in result.keys(), "The result must have a 'endpoint_name' key"
    assert "folder_id" in result.keys(), "The result must have a 'folder_id' key"
    assert "gradient" in result.keys(), "The result must have a 'gradient' key"
    assert "icon" in result.keys(), "The result must have a 'icon' key"
    assert "icon_bg_color" in result.keys(), "The result must have a 'icon_bg_color' key"
    assert "id" in result.keys(), "The result must have a 'id' key"
    assert "is_component" in result.keys(), "The result must have a 'is_component' key"
    assert "name" in result.keys(), "The result must have a 'name' key"
    assert "tags" in result.keys(), "The result must have a 'tags' key"
    assert "updated_at" in result.keys(), "The result must have a 'updated_at' key"
    assert "user_id" in result.keys(), "The result must have a 'user_id' key"
    assert "webhook" in result.keys(), "The result must have a 'webhook' key"


async def test_read_flows(client: AsyncClient, logged_in_headers):
    params = {
        "remove_example_flows": False,
        "components_only": False,
        "get_all": True,
        "header_flows": False,
        "page": 1,
        "size": 50
    }
    response = await client.get("api/v1/flows/", params=params, headers=logged_in_headers)
    result = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert isinstance(result, list), "The result must be a list"

async def test_read_flow(client: AsyncClient, logged_in_headers):
    basic_case = {
        "name": "string",
        "description": "string",
        "icon": "string",
        "icon_bg_color": "#ff00ff",
        "gradient": "string",
        "data": {},
        "is_component": False,
        "webhook": False,
        "endpoint_name": "string",
        "tags": [
            "string"
        ],
        "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "folder_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
    _response = await client.post("api/v1/flows/", json=basic_case, headers=logged_in_headers)
    _id = _response.json()["id"]
    response = await client.get(f"api/v1/flows/{_id}", headers=logged_in_headers)
    result = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert isinstance(result, dict), "The result must be a dictionary"
    assert "data" in result.keys(), "The result must have a 'data' key"
    assert "description" in result.keys(), "The result must have a 'description' key"
    assert "endpoint_name" in result.keys(), "The result must have a 'endpoint_name' key"
    assert "folder_id" in result.keys(), "The result must have a 'folder_id' key"
    assert "gradient" in result.keys(), "The result must have a 'gradient' key"
    assert "icon" in result.keys(), "The result must have a 'icon' key"
    assert "icon_bg_color" in result.keys(), "The result must have a 'icon_bg_color' key"
    assert "id" in result.keys(), "The result must have a 'id' key"
    assert "is_component" in result.keys(), "The result must have a 'is_component' key"
    assert "name" in result.keys(), "The result must have a 'name' key"
    assert "tags" in result.keys(), "The result must have a 'tags' key"
    assert "updated_at" in result.keys(), "The result must have a 'updated_at' key"
    assert "user_id" in result.keys(), "The result must have a 'user_id' key"
    assert "webhook" in result.keys(), "The result must have a 'webhook' key"


async def test_update_flow(client: AsyncClient, logged_in_headers):
    name = "first_name"
    updated_name = "second_name"
    basic_case = {
        "description": "string",
        "icon": "string",
        "icon_bg_color": "#ff00ff",
        "gradient": "string",
        "data": {},
        "is_component": False,
        "webhook": False,
        "endpoint_name": "string",
        "tags": [
            "string"
        ],
        "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "folder_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
    basic_case["name"] = name
    _response = await client.post("api/v1/flows/", json=basic_case, headers=logged_in_headers)
    _id = _response.json()["id"]

    basic_case["name"] = updated_name
    response = await client.patch(f"api/v1/flows/{_id}", json=basic_case, headers=logged_in_headers)
    result = response.json()

    assert isinstance(result, dict), "The result must be a dictionary"
    assert "data" in result.keys(), "The result must have a 'data' key"
    assert "description" in result.keys(), "The result must have a 'description' key"
    assert "endpoint_name" in result.keys(), "The result must have a 'endpoint_name' key"
    assert "folder_id" in result.keys(), "The result must have a 'folder_id' key"
    assert "gradient" in result.keys(), "The result must have a 'gradient' key"
    assert "icon" in result.keys(), "The result must have a 'icon' key"
    assert "icon_bg_color" in result.keys(), "The result must have a 'icon_bg_color' key"
    assert "id" in result.keys(), "The result must have a 'id' key"
    assert "is_component" in result.keys(), "The result must have a 'is_component' key"
    assert "name" in result.keys(), "The result must have a 'name' key"
    assert "tags" in result.keys(), "The result must have a 'tags' key"
    assert "updated_at" in result.keys(), "The result must have a 'updated_at' key"
    assert "user_id" in result.keys(), "The result must have a 'user_id' key"
    assert "webhook" in result.keys(), "The result must have a 'webhook' key"
    assert result["name"] == updated_name, "The name must be updated"
